'use client'
import { Accordion, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { AccordionButton, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import Carousel from './Carousel';
const Recommendation = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      fetch("https://dummyapi.online/api/social-profiles")
        .then((res) => res.json())
        .then((res) => setUserData(res));
    }, []);
  
    if (!userData) {
      return <Flex display={'flex'} justifyContent={"center"} alignItems={"center"} width={"100%"} gap={"5px"}>
      <span className="loader"></span>
      Loading...
      </Flex>;
    }
return (
<Accordion defaultIndex={[0]} allowMultiple width={"100%"}>
  <AccordionItem>
  {({ isExpanded }) => (
    <>

    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left'>
          Emhance Market Analysis
        </Box>

        {isExpanded ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C01F27" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14"/></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C01F27" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            )}
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
 <div className='accordionInnerDiv'>
<div  className='improveListDiv'>
<p style={{fontSize:"16px"}} >How To Improve:</p>
<ul className='ImproveList'>
    <li style={{paddingBottom:"10px"}}>Develop detailed buyer personas including demographic details, farming practices, challenges faced, and media consumption habits.</li>
    <li>Include interviews or testimonials from potential customers to add authenticity.</li>
</ul>
</div>

<div className='improveListDiv'>
<Carousel title="Resources:" data={userData} />
</div>
 </div>
    </AccordionPanel>
    </>
    )}
  </AccordionItem>

  <AccordionItem>
    {({ isExpanded }) => (
      <>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Customer Segmentation
            </Box>
            {isExpanded ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C01F27" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14"/></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C01F27" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            )}
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </>
    )}
    </AccordionItem>

  <AccordionItem>
    {({ isExpanded }) => (
      <>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Competitive Landscape
            </Box>
            {isExpanded ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C01F27" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14"/></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C01F27" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            )}
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </>
    )}
    </AccordionItem>
  <AccordionItem>
    {({ isExpanded }) => (
      <>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Marketing Strategies
            </Box>
            {isExpanded ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C01F27" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14"/></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C01F27" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            )}
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </>
    )}
    </AccordionItem>
  <AccordionItem>
    {({ isExpanded }) => (
      <>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Sales Plan
            </Box>
            {isExpanded ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C01F27" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14"/></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C01F27" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            )}
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </>
    )}
    </AccordionItem>
</Accordion>
  )
}

export default Recommendation