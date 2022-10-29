import ClayTable from '@clayui/table';

///this table no header
    const Table = (props) => {
      
        return (
          <ClayTable>
            <ClayTable.Body>
              <ClayTable.Row>
                <ClayTable.Cell headingTitle>{props.title}</ClayTable.Cell>
              </ClayTable.Row>
            </ClayTable.Body>
          </ClayTable>
        );
      };
      
      
  

export default Table