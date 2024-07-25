import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import Navbar from "./Navigation";
import Sections from "./Sections";
import PlanSection from "../components/PlanSection";
import { useSelector } from "react-redux";
import { MdArrowBack } from "react-icons/md";

const PlanPage = () => {
  // const { section } = useParams();
  const projectName = useSelector((state) => state.project.projectName);
  const sectionName = useSelector((state) => state.project.sectionName);
  
  return (
    <Box width={"-webkit-fill-available"} bg={"white"}>
      {/* <Navbar /> */}
      <Box bg={"white"} p={4} px={4}>
        <Box py={4}>
          <Breadcrumb
            spacing="4px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            {/* <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Flex alignItems="center">
                  <Icon as={MdArrowBack} mr={2} /> Home
                </Flex>
              </BreadcrumbLink>
            </BreadcrumbItem> */}
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink fontWeight={"bold"} fontSize={"30px"} href="#">
                {projectName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Flex >
          <Sections />
          <PlanSection section={sectionName} projectName={projectName} />
        </Flex>
      </Box>
    </Box>
  );
};

export default React.memo(PlanPage);
