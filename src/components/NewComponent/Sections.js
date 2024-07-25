import React from 'react';
import { VStack, Box, Text, Link } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProjectName, setSectionName } from '../actions/projectActions';

const Sections = () => {
  const projectName = useSelector((state) => state.project.projectName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const sections = [
    'Summary',
    'Company Description',
    'Market Analysis',
    'Organization',
    'Products and Services',
    'Marketing and Sales',
    'Financial Projections',
    'Funding Requirements',
    'Executive Summary',
  ];

  const location = useLocation();

  const handleNavigation = (section) => {
    let sectionName = section.toLowerCase().replace(/ /g, '_')
    navigate("/business-plan/"+section.toLowerCase().replace(/ /g, '_'))
    dispatch(setProjectName(projectName));
    dispatch(setSectionName(sectionName));
  }

  return (
    <VStack align="start" spacing={4} bg='white'  h={"fit-content"} gap={1} width={"192px"}>
      {sections.map((section, index) => {
        const path = `/business-plan/${section.toLowerCase().replace(/ /g, '_')}`;
        const isActive = location.pathname === path;
        
        return (
          <Box key={index} py={2} width={"-webkit-fill-available"} onClick={() => handleNavigation(section)} style={{ cursor: 'pointer'}} >
            {/* <Link as={NavLink} to={path} _hover={{ textDecoration: 'none' }}> */}
              <Text fontSize="md"  color={'#333333'} fontWeight={isActive ? 'bold' : 'medium'}>
                {section}
              </Text>
            {/* </Link> */}
          </Box>
        );
      })}
    </VStack>
  );
};

export default Sections;
