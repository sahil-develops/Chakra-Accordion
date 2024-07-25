import { useEffect, useState } from "react";
import Recommendation from "./Recommendation";
import {
  ChakraProvider,
  Box,
  Checkbox,
  VStack,
Input,
  Flex,
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import AImessage from "./Chat/Botmessage";
import Usermessage from "./Chat/Usermessage";

// import { } from '@chakra-ui/react';
function MainContent() {


  useEffect(() => {
    fetch("https://dummyapi.online/api/social-profiles")
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);

  const [selectedTab, setSelectedTab] = useState("Build");

  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const items = [
    "Market Analysis",
    "Customer segmentation",
    "Competitive landscape",
    "Marketing Strategy",
    "Sales Plan",
  ];

  return (
    <div className="mainAppdiv">
    <Breadcrumb spacing='8px' marginLeft={"20px"} className="poppins-regular" separator={<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>}>
  <BreadcrumbItem fontWeight={"500"} fontSize={"12px"}>
    <BreadcrumbLink href='#' color={"#999999"}>Home</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem fontSize={"12px"}>
    <BreadcrumbLink fontWeight={"500"} href='#' color={"#999999"}>AI Assistants</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem isCurrentPage fontSize={"12px"}>
    <BreadcrumbLink href='#' color={"#F38B2D"}>New Business Plan</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
      <div>
        <p className="appdivHeader poppins-regular">Coconut Fibre product</p>
      </div>

      <div className="appDivTabsName">
        <div>
          <button
            onClick={() => setSelectedTab("Build")}
            className="mainDivButton poppins-regular"
            style={{
              backgroundColor: selectedTab === "Build" ? "#FEF8F5" : "",
              color: selectedTab === "Build" ? "#C01F27" : "",
              borderRadius: "10px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C01F27"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-box"
            >
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
            Build
          </button>
        </div>
        <div>
          <button
            className="mainDivButton poppins-regular"
            onClick={() => setSelectedTab("Draft")}
            style={{
              backgroundColor: selectedTab === "Draft" ? "#FEF8F5" : "",
              color: selectedTab === "Draft" ? "#C01F27" : "",
              borderRadius: "10px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C01F27"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-text"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M10 9H8" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>
            Draft
          </button>
        </div>
        <div>
          <button
            className="mainDivButton poppins-regular"
            onClick={() => setSelectedTab("Recommendation")}
            style={{
              backgroundColor:
                selectedTab === "Recommendation" ? "#FEF8F5" : "",
              color: selectedTab === "Recommendation" ? "#C01F27" : "",
              borderRadius: "10px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C01F27"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-thumbs-up"
            >
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
            Recommendation
          </button>
        </div>
      </div>

      <div className="contentdiv">
        {selectedTab === "Build" && (
          <div
            className="poppins-regular buildMainDiv"
            style={{ padding: "20px 20px" }}
          >
            <div className="buildListTab">
              <VStack align="stretch" spacing={2} p={4}>
                {items.map((item, index) => (
                  <Box
                    key={index}
                    className="svgContainerList"
                    display="flex"
                    alignItems="center"
                  >
                    <Checkbox
                      isChecked={index < step}
                      onChange={() => setStep(index + 1)}
                      colorScheme="green"
                      className={`${
                        index < step ? "checkBox" : "uncheckedCheckbox"
                      } `}
                      size="xl"
                      mr={8}
                    />
                    <p className="margin-none">{item}</p>
                  </Box>
                ))}
              </VStack>
            </div>

            <Flex direction={"column"} alignItems={"start"} justifyContent={"flex-start"} gap={"20px"} marginTop={"20px"} marginLeft={"40px"}>

<AImessage text="What is your company Name" />
<Usermessage text="Coconut Fibre Product" />

<AImessage text="What is your company tagline" />

<Usermessage text="Lorem Ipsum is simply dummy text of the printing and typesetting industry" />

<AImessage text="What is your company logo?" />
<ChakraProvider>
<InputGroup border={"#FCE6D5"}  >
    {/* <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
      $
    </InputLeftElement> */}
    <Input placeholder='Enter your query' />
    <InputRightElement className="InputGroupChat">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" style={{color:"#B9333F"}} height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg"  width={"24"} height={"24"}   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/></svg>
    </InputRightElement>

  </InputGroup>
</ChakraProvider>

            </Flex>
          </div>
        )}
        {selectedTab === "Draft" && (
          <div className="poppins-regular" style={{ padding: "20px 20px" }}>
            This is Draft Tab, Click on the Recommendation tab
          </div>
        )}
        {selectedTab === "Recommendation" && (
          <div className="poppins-regular recommedntaionTab">
            <p style={{ marginBottom: "20px", fontSize: "20px" }}>
              Marketing and Sales Strategy
            </p>
            <ChakraProvider>
              <Recommendation />
            </ChakraProvider>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainContent;
