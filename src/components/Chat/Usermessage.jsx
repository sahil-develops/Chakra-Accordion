import { Flex } from '@chakra-ui/react'
import React from 'react'

const Usermessage = ({text}) => {
  return (
<Flex direction={"row"} alignItems={"center"} gap={"10px"} justifyContent={"flex-start"}>
<div>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDVyvvDiuIj21d51MUlE4zX4q4OP3VE0lhJQ&s" style={{borderRadius:"20px", width:"30px"}} />
</div>

<Flex direction={"column"} gap={"0px"} alignItems={"start"} justifyContent={"flex-start"}>
<p className="margin-none" style={{fontSize:"16px",color:"#ED892F"}}>You</p>
<p className="margin-none" style={{fontSize:"14px"}}>{text}</p>
</Flex>
</Flex>
  )
}

export default Usermessage