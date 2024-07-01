import React, {useEffect} from "react";
import useMeterListData from "../../hooks/useMeterListData";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import useMeterId from "../../contexts/meterId";
import { useNavigate } from "react-router-dom";

function MeterListTable() {
  const data = useMeterListData();
  const navigate = useNavigate();   //For navigating one page to another 
  const {meter, setMeter} = useMeterId();

  const CustomButtonComponent = (props) => {
    const onViewHandler = ()=>{
        setMeter(props.data.meter_id)
        navigate("/home");
    }
    return (
      <button 
        onClick={onViewHandler}>View</button>
    );
  };

  const columnDefs = [
    { headerName: "Id", valueGetter: "node.rowIndex + 1", flex: 1 },
    { headerName: "Meter Name", field: "meter_name", flex: 1 },
    { headerName: "Instant Flow", field: "instant_flow", flex: 1 },
    { headerName: "Today's Flow", field: "today_flow", flex: 1 },
    { headerName: "Last Seen", field: "dtime", flex: 1 },
    { field: "Option", cellRenderer: CustomButtonComponent, flex: 1 },
  ];

  return (
    <div className="border-2 rounded-xl border-blue-200 m-5 p-2">
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={data}
          columnDefs={columnDefs}
        />
      </div>
    </div>
  );
}

export default MeterListTable;
