import React, { useState, useEffect } from "react";
// import Guage1data from '../../Components/Observation_data_guage/Guage1data';
// import T1data from '../../Components/Observation_data_tank/T1data';
// import { fetchLatestData } from '../../api';
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import Guage1 from "../../Components/Guages/Guage1";
import T1data from "../../Components/Tank/T1data";
import DailyUsage1 from "../../Components/usage/Dailyusage1";
import MonthlyUsage1 from "../../Components/usage/Monthlyusage1";
import Lastupdate from "../../Components/Lastupdated/Lastupdate";
import Metername from "../../Components/metername/Metername";
import Meterdata from "../../Components/Guages/Meterdata";
import Guage2 from "../../Components/Guages/Guage2";
import UpdateConfig from "../../Components/controllling/updateconfig";
import Monthly from "../../Components/graphs/Monthly";
import Daily from "../../Components/graphs/Daily";
import Instantaneous from "../../Components/graphs/Instantaneous";
import { Dropdown } from "rsuite";

// import Valve1data from '../../Components/Observation_data_guage/Valve1data';
// import Graphdays1 from '../../Components/Observation_data_graph/Graphdays1';
// import Graphmonths1 from '../../Components/Observation_data_graph/Graphmonths1';
// import MontlyUsage1 from '../../Components/Observation_data_usage/Monthlyusage1';
// import DailyUsage1 from '../../Components/Observation_data_usage/Dailyusage1';

function Home() {

  const [selectedOption, setSelectedOption] = useState('Daily');

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };

  return (
    <>
      <div className="main">
        <Navbar />
        <div className="label2">
          <div className="label">
            <div className="label1">
              <span style={{ color: "white" }}>Last update:</span>
              <Lastupdate />
              <div className="theend">
                <Metername />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="biggest  flex flex-col justify-center">
            <div className="bigger">
              <div className="chintu">
                <div className="headin">Meters</div>
                <div className="apart">
                  <Guage1 />
                  {/* <Meterdata/> */}
                  {/* <UpdateConfig/> */}
                  <Guage2 />
                </div>
              </div>
              <div className="chintu">
                <div className="headin">Tank</div>
                <div className="jadu">
                  <T1data />
                </div>
              </div>
            </div>
            <div className="bigger2">
              <div className="chintu3">
                <div className="headin">Usage Analysis</div>
                <div className="madhi">
                  <div className="gcss1">
                    <DailyUsage1 />
                    <MonthlyUsage1 />
                  </div>
                </div>
              </div>
            </div>

            <Dropdown title={selectedOption} onSelect={handleSelect} className="py-1 px-2 w-8">
              <Dropdown.Item eventKey="Daily" >Daily</Dropdown.Item>
              <Dropdown.Item eventKey="Instantaneous">Instantaneous</Dropdown.Item>
            </Dropdown>

            <div className="bigger2">
              <div className="chintu2">
                <div className="headin">Graph</div>
                <div className="gcss">
                  {selectedOption==="Daily"? <Daily /> : <Instantaneous /> }
                </div>
              </div>
            </div>
            <div className="bigger2">
              <div className="chintu2">
                <div className="headin">Graph</div>
                <div className="gcss">
                  <Monthly />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
