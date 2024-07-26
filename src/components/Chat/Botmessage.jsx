import { Flex } from '@chakra-ui/react'
import React from 'react'

const Botmessage = ({text}) => {
  return (
<Flex direction={"row"} alignItems={"center"} gap={"10px"} justifyContent={"flex-start"}>
<div>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdyTh5ljvubR6s3LeERqK8DHldWwD3DcwBLw&s" style={{borderRadius:"20px", width:"30px"}} />
</div>

<Flex direction={"column"} gap={"0px"} alignItems={"start"} justifyContent={"flex-start"}>
<p className="margin-none" style={{color:"#C32934",fontSize:"16px"}}>Genie AI</p>
<p className="margin-none" style={{fontSize:"14px"}}>{text}</p>
</Flex>
</Flex>
  )
}

export default Botmessage