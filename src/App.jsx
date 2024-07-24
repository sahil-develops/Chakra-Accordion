import { useEffect, useState } from 'react'
import './App.css'
import Recommendation from './components/Recommendation'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  useEffect(() => {
    fetch('https://dummyapi.online/api/social-profiles')
    .then((response) => response.json())
    .then((json) => console.log(json));
  }, []);
  const [selectedTab, setSelectedTab] = useState('Build')
  return (
    <div className='mainAppdiv'>
  <div>
    <p className='appdivHeader poppins-regular' >Coconut Fibre product</p>
  </div>

  <div className='appDivTabsName'>
<div>
<button onClick={()=>setSelectedTab("Build")} className='mainDivButton poppins-regular' style={{backgroundColor:selectedTab === "Build" ? "#FEF8F5" :"",color:selectedTab === "Build" ? "#C01F27" :"",borderRadius:"10px"}} >
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C01F27" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-box"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
Build</button>
</div>
<div>
<button className='mainDivButton poppins-regular' onClick={()=>setSelectedTab("Draft")} style={{backgroundColor:selectedTab === "Draft" ? "#FEF8F5" :"",color:selectedTab === "Draft" ? "#C01F27" :"",borderRadius:"10px"}}>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C01F27" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
Draft</button>
</div>
<div>
<button className='mainDivButton poppins-regular' onClick={()=>setSelectedTab("Recommendation")} style={{backgroundColor:selectedTab === "Recommendation" ? "#FEF8F5" :"",color:selectedTab === "Recommendation" ? "#C01F27" :"",borderRadius:"10px"}} >
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C01F27" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
Recommendation</button>
</div>
  </div>

<div className='contentdiv' >
{selectedTab === 'Build' && <div className='poppins-regular'style={{padding:"20px 20px"}}>This is Build Tab, Click on the Recommendation tab</div>}
{selectedTab === 'Draft' && <div className='poppins-regular'style={{padding:"20px 20px"}}>This is Draft Tab, Click on the Recommendation tab</div>}
{selectedTab === 'Recommendation' && <div className='poppins-regular recommedntaionTab'>
  <p>Marketing and Sales Strategy</p>
  <ChakraProvider>
  <Recommendation/>
  </ChakraProvider>
</div>}
</div>

    </div>
  )
}

export default App
