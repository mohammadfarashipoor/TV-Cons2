import ClayIcon from '@clayui/icon';
import {MODAL, TOAST, useActions} from '@sainui/context';
import axios from 'axios';
import findIndex from 'lodash/findIndex';
import pickBy from 'lodash/pickBy';
import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {LEVEL_DELETE_SINGLE_URL, LEVEL_GET_ALL_URL} from '../../constants/urls';
import View from './view';

export default function Controller() {
	const action = useActions();
	const history = useHistory();

	//   data

	const [data, setData] = useState({
		activePage: 1,
		filter: [
			{
				active: false,
				key: 'active',
				label: 'کمپین های فعال',
				name: 'activeTrue',
				onClick: () => handelFilter('activeTrue'),
				text: 'فیلتر بر اساس کمپین های فعال',
				value: 'active eq true',
			},
			{
				active: false,
				key: 'active',
				label: 'کمپین های غیر فعال',
				name: 'activeFalse',
				onClick: () => handelFilter('activeFalse'),
				text: 'فیلتر بر اساس کمپین های غیرفعال',
				value: 'active eq false',
			},
		],
		items: null,
		lastPage: null,
		loading: true,
		pageSize: 16,
		refresh: {},
		searchValue: '',
		selectedItems: null,
		sort: [
			{asc: null, label: 'عنوان', title: 'name'},
			{asc: null, label: 'تاریخ ویرایش', title: 'modifiedDate'},
		],
		totalCount: null,
		viewType: {
			symbolLeft: 'table',
		},
	});
	const updateSelectedItems = (num) => {
		var rows = [];
		for (let index = 0; index < num; index++) {
			rows.push({rowIndex: index, selected: false});
		}

		return rows;
	};

	//   filter

	const handelFilter = (title) => {
		setData((os) => {
			var filterIndex = findIndex(os.filter, {name: title});
			var filterItem = os.filter[filterIndex];

			//   disable other filter

			Object.keys(pickBy(os.filter, {key: filterItem.key})).map(
				(index) => {
					if (os.filter[Number(index)].name !== filterItem.name) {
						os.filter[Number(index)].active = false;
					}
				}
			);

			//   change ststaus

			filterItem.active = !filterItem.active;

			//   insert before

			os.filter.splice(filterIndex, 1);
			os.filter.unshift({...filterItem});

			return {...os, filter: [...os.filter], loading: true};
		});
	};

	//   selected Items

	const mainCheckBoxStatus = (data, type) => {
		var {items, loading, selectedItems} = data;

		if (loading) {
			return false;
		}
		if (items.length === 0) {
			return false;
		}

		var falseItem = findIndex(selectedItems, {selected: false});
		var trueItem = findIndex(selectedItems, {selected: true});

		if (type === 'checked') {
			if (!(falseItem !== -1)) {
				return true;
			}
		}
		else {
			if (falseItem !== -1 && trueItem !== -1) {
				return true;
			}
		}

		return false;
	};
	const changeItemSelected = (key) => {
		setData((os) => {
			os.selectedItems[key].selected = !os.selectedItems[key].selected;

			return {...os};
		});
	};

	//   search

	const searchInputRef = useRef();
	const handelSearch = (ev) => {
		if (ev !== 'clear') {
			ev.preventDefault();
		}
		else {
			searchInputRef.current.value = '';
		}
		if (data.searchValue === searchInputRef.current.value) {
			return;
		}

		setData((os) => {
			return {
				...os,
				activePage: 1,
				loading: true,
				searchValue: searchInputRef.current.value,
			};
		});
	};

	//   viewType

	const viewTypes = [
		{
			label: 'جدول',
			symbolLeft: 'table',
		},
		{
			label: 'لیست',
			symbolLeft: 'list',
		},
		{
			label: 'کارتها',
			symbolLeft: 'cards2',
		},
	];
	viewTypes.forEach((item) => {
		item.onClick = () => {
			setData((os) => {
				return {...os, viewType: item};
			});
		};
	});
	const [searchMobile, setSearchMobile] = useState(false);

	//   sort

	const handelSort = (sortTitle) => {
		setData((os) => {
			var sortIndex = findIndex(os.sort, {title: sortTitle});
			var sortItem = os.sort[sortIndex];

			//   change ststaus

			if (sortItem.asc === null) {
				sortItem.asc = true;
			}
			else {
				if (sortItem.asc === false) {
					sortItem.asc = null;
				}
				else {
					sortItem.asc = false;
				}
			}

			//   insert before

			os.sort.splice(sortIndex, 1);
			os.sort.unshift({...sortItem});

			return {...os, loading: true, sort: [...os.sort]};
		});
	};
	const sortIcon = (sortTitle) => {
		var sortItem = data.sort[findIndex(data.sort, {title: sortTitle})];
		if (sortItem && sortItem.asc === null) {
			return;
		}

		return (
			<ClayIcon
				className="mx-2"
				symbol={sortItem.asc ? 'angle-down-small' : 'angle-up-small'}
			/>
		);
	};
	var sortItems = data.sort.map((item) => {
		var newItem = {};
		newItem.label = (
			<div>
				{sortIcon(item.title)}

				{item.label}
			</div>
		);
		newItem.onClick = () => handelSort(item.title);

		return newItem;
	});

	// delete levels

	const deleteLevels = (ids) => {
		var levelIds = ids;

		if (!ids) {
			levelIds = [];
			data.selectedItems.map((o) => {
				if (o.selected) {
					levelIds.push(data.items[o.rowIndex].id);
				}
			});
		}

		action({
			payload: {
				acceptText: 'بله',
				cancelText: 'خیر',
				closeOnCancel: true,
				description: `آیا با حذف سطح انتخاب شده موافقید ؟`,
				onAccept: () => {
					setData((os) => {
						return {...os, loading: true};
					});
					action({
						payload: {visible: false},
						type: MODAL,
					});
					axios
						.delete(
							LEVEL_DELETE_SINGLE_URL.replace(
								'{levelId}',
								levelIds[0]
							)
						)
						.then(() => {
							setData((os) => {
								return {...os, refresh: {}};
							});

							action({
								payload: {
									autoClose: 5000,
									displayType: 'success',
									hideCloseIcon: true,
									title: 'عملیات با موفقیت انجام شد',
								},
								type: TOAST,
							});
						})
						.catch(() => {});
				},
				target: 'alert',
				title: 'حذف',
				visible: true,
			},
			type: MODAL,
		});

		/*
    action({
      payload: {
        acceptText: "بله",
        cancelText: "خیر",
        closeOnCancel: true,
        description: `آیا با حذف  ${
          levelIds.length > 1 ? "سطوح" : "سطح"
        } انتخاب شده موافقید ؟`,
        onAccept: () => {
          setData((os) => {
            return { ...os, loading: true };
          });
          action({
            payload: { visible: false },
            type: MODAL,
          });
          axios
            .delete(
              LEVEL_DELETE_GROUP_URL.replace("{levelIds}", levelIds.join(","))
            )
            .then(() => {
              setData((os) => {
                return { ...os, refresh: {} };
              });

              action({
                payload: {
                  autoClose: 5000,
                  displayType: "success",
                  hideCloseIcon: true,
                  title: "عملیات با موفقیت انجام شد",
                },
                type: TOAST,
              });
            })
            .catch(() => {});
        },
        target: "alert",
        title: "حذف",
        visible: true,
      },
      type: MODAL,
    });
    */
	};

	//   actions

	const actions = ({id}) => {

		// return items

		return [
			{
				label: 'ویرایش',
				onClick: () => history.push(`/level/form/${id}`),
			},
			{
				label: 'حذف',
				onClick: () => deleteLevels([id]),
			},
		];
	};

	//   get data

	useEffect(() => {

		// pagination

		var params = `?pageSize=${data.pageSize}&page=${data.activePage}`;

		// search

		if (data.searchValue !== '') {
			params += `&search=${data.searchValue}`;
		}

		// filter

		data.filter.map((item, key) => {
			if (item.active) {
				params += `${key === 0 ? `&filter=` : `,`}${item.value}`;
			}
		});

		// sort

		data.sort.map((item, key) => {
			if (item.asc !== null) {
				params += `${key === 0 ? `&sort=` : `,`}${item.title}:${
					item.asc ? 'asc' : 'desc'
				}`;
			}
		});

		axios
			.get(`${LEVEL_GET_ALL_URL + params}`)
			.then((response) => {
				setData((oldState) => {
					return {
						...oldState,
						activePage: response.data.page,
						items: response.data.items,
						lastPage: response.data.lastPage,
						loading: false,
						pageSize: response.data.pageSize,
						selectedItems: updateSelectedItems(
							response.data.items.length
						),
						totalCount: response.data.totalCount,
					};
				});
			})
			.catch(() => {});
	}, [
		data.searchValue,
		data.activePage,
		data.pageSize,
		data.filter,
		data.sort,
		data.refresh,
	]);

	return (
		<View
			{...{
				actions,
				changeItemSelected,
				data,
				deleteLevels,
				handelFilter,
				handelSearch,
				handelSort,
				mainCheckBoxStatus,
				searchInputRef,
				searchMobile,
				setData,
				setSearchMobile,
				sortIcon,
				sortItems,
				viewTypes,
			}}
		/>
	);
}
