import ClayTable from "@clayui/table";

const TableWeek = (props) => {
  const { item } = props;
  return (
    <ClayTable>
      <ClayTable.Body>
        <ClayTable.Row>
          <ClayTable.Cell headingTitle>{item.name}</ClayTable.Cell>
          <ClayTable.Cell>
            {item.time[0] === 2 ? "بعد از ظهر" : "قبل از ظهر"}{" "}
            {("0" + item.time[2]).slice(-2)} : {("0" + item.time[1]).slice(-2)}
          </ClayTable.Cell>
        </ClayTable.Row>
      </ClayTable.Body>
    </ClayTable>
  );
};

export default TableWeek;
