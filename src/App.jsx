import './App.css'
import MainContent from './components/MainComp';

function App() {
  const items = [
    "Market Analysis",
    "Customer segmentation",
    "Competitive landscape",
    "Marketing Strategy",
    "Sales Plan",
  ];
  return (
    <div className=''>
<MainContent items={items}/>

    </div>
  )
}

export default App
