import React from 'react'
import DaySankey from '../../Components/graphs/DaySankey.jsx'
import MeterListTable from '../../Components/MeterListTable/MeterListTable.jsx'

function Overview() {
  return (
    <div className='flex-col'>
      <DaySankey />
      <MeterListTable />
    </div>
  )
}

export default Overview
