// src/components/MainLayout.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  VStack,
  Text,
  HStack,
  IconButton,
  Collapse,
  Button,
  Link,
  Divider,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import {
  AddIcon,
  MinusIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import CreateBusinessPlan from "../components/createbusinessplan.js";
// import { fetchProjects } from "../services/api";
// import start_new from "../assets/start_new.png";
// import home_icon from "../assets/home_icon.png";
// import wadhwaniImage from "../assets/wadhwani.png";
// import { setProjectName, setSectionName } from "../actions/projectActions";
import PlanPage from "./PlanPage.js";

const SidebarItem = ({ icon, label, children, isOpen, onToggle }) => (
  <Box w="full">
    <HStack
      p={4}
      // bg={isOpen ? "#F7ECD9" : "#FEF8F5"}
      // borderLeft={isOpen ? "6px solid #F68821" : "none"}
      cursor="pointer"
      onClick={onToggle}
      // _hover={{ bg: "#F7ECD9" }}
      justify="space-between"
    >
      <HStack spacing={3}>
        {icon}
        <Text color={isOpen ? "#FF7A59" : "#333333"}>{label}</Text>
      </HStack>
      <IconButton
        icon={
          isOpen ? (
            <MinusIcon color={"#C01F27"} />
          ) : (
            <AddIcon color={"#C01F27"} />
          )
        }
        size="sm"
        variant={""}
        aria-label={isOpen ? "Collapse" : "Expand"}
      />
    </HStack>
    <Collapse in={isOpen}>
      <VStack align="start" pl={4} bg="#FEF8F5" spacing={2} py={2}>
        {children}
      </VStack>
    </Collapse>
  </Box>
);

const BusinessPlanPage = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("input");

  const [openIndex, setOpenIndex] = useState(null);
  const [projects, setProjects] = useState([]);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjects();
        setProjects(response.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    loadProjects();
  }, []);

  // const handleContinue = (projectName) => {
  //   dispatch(setProjectName(projectName));
  //   dispatch(setSectionName("company_description"));
  //   localStorage.setItem("projectName", projectName);
  //   localStorage.setItem("sectionName", "company_description");
  //   setModalOpen(false);
  //   // navigate(`/business-plan/company_description`);
  // };

  return (
    <Box minH="100vh" bg="white">
      {/* <Flex direction="column" h="100vh" bg="white"> */}
      <Flex
        bg="white"
        p={4}
        boxShadow="md"
        align="center"
        justify="space-between"
      >
        <Box pl={5} bg="white">
          <Link href="/" textDecoration={"none"}>
            <Image
              src={wadhwaniImage}
              alt="Wadhwani Foundation"
              style={{ height: "50px" }}
            />
          </Link>
        </Box>
        <HStack spacing={10} color={"6F6F6F"}>
          <Text color={"#F68821"} fontWeight={"500"}>
            Home
          </Text>
          <Menu isLazy>
            <MenuButton color={"#6F6F6F"}>AI Assistants</MenuButton>
            <MenuList>
              {/* MenuItems are not rendered unless Menu is open */}
              <MenuItem>Marketing</MenuItem>
              <MenuItem>Sales</MenuItem>
              <MenuItem>Finance</MenuItem>
              <MenuItem>Human Resource</MenuItem>
            </MenuList>
          </Menu>
          <Text color={"#6F6F6F"}>Expert Network</Text>
          <Text color={"#6F6F6F"}>Learning Library</Text>
          <Text color={"#6F6F6F"}>Programs</Text>
          <Text color={"#6F6F6F"}>Events</Text>
          <Avatar name="Chenna" src="" />
        </HStack>
      </Flex>
      {/* <Box bg="#F1F3F6" p={4} px={20}> */}
      <Flex bg={"#ffffff"} minH={"100vh"}>
        {/* <Sidebar
            activeIndex={activeIndex}
            handleClick={handleClick}
            onOpenNewPlanModal={handleOpenModal}
          /> */}

        {/* <IconButton
         aria-label="Home"
         icon={<ChevronLeftIcon />}
         variant="ghost"
         colorScheme="red"
         mb={4}
       /> */}
        <VStack
          align="start"
          w={{ base: "full", md: "250px" }}
          p={4}
          spacing={0}
          boxShadow="md"
          bg="#FEF8F5"
        >
          <Link href="/" textDecoration={"none"} mb={2}>
            <Image src={home_icon} alt="" />
          </Link>
          <Box
            color="#FEE6D4"
            // bg={"#FEE6D4"}
            // h={"1px"}
            w={"-webkit-fill-available"}
            border={"1px solid #FEE6D4"}
          ></Box>
          <HStack
            cursor="pointer"
            onClick={handleOpenModal}
            mt={"1em"}
            borderRadius={"8px"}
            bg={"#FEF1E9"}
            w={"-webkit-fill-available"}
            justifyContent={"center"}
          >
            <Text bg={"#FEF1E9"} color={"#C01F27"} my={3}>
              Start New
            </Text>
            <Image src={start_new} alt="Start New" boxSize="20px" />
          </HStack>

          <SidebarItem
            // icon={<FaClipboard />}
            label="Plans"
            isOpen={openIndex === 5}
            onToggle={() => handleToggle(5)}
          >
            <Flex
              direction="column"
              bg="#FEF8F5"
              w="-webkit-fill-available"
              justifyContent="space-between"
            >
              <Box>
                {/* <Heading as="h2" size="md" mb={4} mt={4} color="#FF7A59">
                  Conversation History
                </Heading> */}
                <Text fontSize="sm" color="#FF7A59" mb={2}>
                  Today
                </Text>
                {projects &&
                  projects.length > 0 &&
                  projects.map((project, index) => {
                    return (
                      <Box
                        key={index}
                        pl={4}
                        py={2}
                        cursor={"pointer"}
                        // onClick={() => handleContinue(project)}
                      >
                        <Text fontSize="md" fontWeight="medium" color="black">
                          {project}
                        </Text>
                        {/* </Link> */}
                      </Box>
                    );
                  })}
              </Box>
            </Flex>
          </SidebarItem>
        </VStack>

        <PlanPage />
        <CreateBusinessPlan isOpen={isModalOpen} onClose={handleCloseModal} />
      </Flex>
    </Box>
  );
};

export default BusinessPlanPage;
