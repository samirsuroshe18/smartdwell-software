import './Metername.css'
import useLatestUsageData from '../../hooks/usage/useLatestUsageData';

const Metername = () => {
  const response = useLatestUsageData();

  return (
    <div className='mname'>{response.meter_name || 'N/A'}</div>
  );
};

export default Metername;
