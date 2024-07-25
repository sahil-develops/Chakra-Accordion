import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Text,
  Spinner,
  Heading,
  Flex,
  Textarea,
  IconButton,
  Avatar,
  Image,
  HStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  PDFDownloadLink,
  Page,
  Text as PDFText,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import Draft from "./DraftSection";
import {
  chatWithProject,
  createDraft,
  loadHistory,
  loadDraft,
} from "../services/api";
import { ArrowUpIcon } from "@chakra-ui/icons";
import genie_logo from "../assets/genie_logo.png";
import Rec_icon from "../assets/Rec_icon.png";
import draft from "../assets/draft.png";
import build from "../assets/build.png";
import ImproveSection from "./ImproveSection";

const sections = {
  summary: "Summary",
  executive_summary: "Executive Summary",
  company_description: "Company Description",
  market_analysis: "Market Analysis",
  organization: "Organization",
  products_and_services: "Products and Services",
  marketing_and_sales: "Marketing and Sales",
  financial_projections: "Financial Projections",
  funding_requirements: "Funding Requirements",
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  strong: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

const GeneratePDFDocument = ({ content }) => (
  <Document>
    <Page style={styles.page}>
      {content
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line, index) => {
          if (index === 0) {
            return null;
          }
          if (line.startsWith("### ")) {
            return (
              <PDFText style={styles.heading} key={index}>
                {line.replace("### ", "")}
              </PDFText>
            );
          } else if (line.startsWith("####")) {
            return (
              <PDFText style={styles.heading} key={index}>
                {line.replace("#### ", "")}
              </PDFText>
            );
          } else if (line.startsWith("---")) {
            return null;
          } else if (line.startsWith("**") && line.endsWith("**")) {
            return (
              <PDFText style={styles.strong} key={index}>
                {line.replace(/\*\*/g, "")}
              </PDFText>
            );
          } else {
            return (
              <PDFText style={styles.text} key={index}>
                {line}
              </PDFText>
            );
          }
        })}
    </Page>
  </Document>
);

const GenerateCompletePDFDocument = ({ content }) => (
  <Document>
    <Page style={styles.page}>
      {content
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line, index) => {
          if (index === 0) {
            return null;
          }
          if (line.startsWith("### ")) {
            return (
              <PDFText style={styles.heading} key={index}>
                {line.replace("### ", "")}
              </PDFText>
            );
          } else if (line.startsWith("####")) {
            return (
              <PDFText style={styles.heading} key={index}>
                {line.replace("#### ", "")}
              </PDFText>
            );
          } else if (line.startsWith("---")) {
            return null;
          } else if (line.startsWith("**") && line.endsWith("**")) {
            return (
              <PDFText style={styles.strong} key={index}>
                {line.replace(/\*\*/g, "")}
              </PDFText>
            );
          } else {
            return (
              <PDFText style={styles.text} key={index}>
                {line}
              </PDFText>
            );
          }
        })}
    </Page>
  </Document>
);

const PlanSection = ({ section }) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isDraftReady, setIsDraftReady] = useState(false);
  const [draftContent, setDraftContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [mergedDraft, setMergedDraft] = useState("");
  const [activeTabIndex, setActiveTabIndex] = useState(0); // State to manage active tab index
  const projectName = useSelector((state) => state.project.projectName);
  const chatContainerRef = useRef(null);

  const handleDownloadCompletePlan = async () => {
    const drafts = await fetchAllDrafts(projectName);
    const mergedContent = mergeDrafts(drafts);
    setMergedDraft(mergedContent);
  };

  const fetchChatHistory = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const response = await loadHistory(projectName, section);
      setChatHistory(response.history);
    } catch (error) {
      console.error(
        "Error fetching chat history:",
        error.response?.data || error.message
      );
    }
    setLoadingHistory(false);
  }, [projectName, section]);

  const fetchAllDrafts = async (projectName) => {
    const drafts = {};
    for (const sectionKey of Object.keys(sections)) {
      try {
        const response = await loadDraft(projectName, sectionKey);
        if (response.draft) {
          drafts[sectionKey] = response.draft;
        } else {
          drafts[sectionKey] = ""; // Handle missing drafts
        }
      } catch (error) {
        drafts[sectionKey] = ""; // Handle errors
        console.error(`Error fetching draft for ${sectionKey}:`, error);
      }
    }
    return drafts;
  };

  const mergeDrafts = (drafts) => {
    let mergedContent = "";
    for (const sectionKey of Object.keys(sections)) {
      if (drafts[sectionKey]) {
        mergedContent += `### ${sections[sectionKey]}\n${drafts[sectionKey]}\n\n`;
      }
    }
    return mergedContent;
  };

  const fetchDraft = useCallback(async () => {
    setLoadingDraft(true);
    try {
      const response = await loadDraft(projectName, section);
      if (response.draft) {
        setDraftContent(response.draft);
      }
    } catch (error) {
      setDraftContent("");
      console.error(
        "Error fetching draft:",
        error.response?.data || error.message
      );
    }
    setLoadingDraft(false);
  }, [projectName, section]);

  useEffect(() => {
    if (projectName && section) {
      // setActiveTabIndex(0); // Reset to "Input" tab when section changes
      setIsDraftReady(false);
      fetchChatHistory();
      fetchDraft();
    }
  }, [projectName, section, draftContent]);

  useEffect(() => {
    if (chatHistory.length) {
      scrollToBottom();
    }
  }, [chatHistory]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async (message) => {
    if (!message) return;

    const updatedConversation = [
      ...chatHistory,
      { role: "user", content: message },
    ];

    setUserInput("");

    try {
      setLoading(true);
      setChatHistory(updatedConversation);
      const response = await chatWithProject(projectName, section, message);

      setChatHistory([
        ...updatedConversation,
        { role: "assistant", content: response.response },
      ]);

      if (
        response.response.toLowerCase().includes("drafting") ||
        response.response.toLowerCase().includes("create a draft") ||
        response.response.toLowerCase().includes("draft based on") ||
        response.response.toLowerCase().includes("creating a draft") ||
        response.response.toLowerCase().includes("developing the draft") ||
        response.response.toLowerCase().includes("shall i draft") ||
        response.response.toLowerCase().includes("ready to create a draft")
      ) {
        setIsDraftReady(true);
      }
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
      setChatHistory([
        ...updatedConversation,
        { role: "assistant", content: "Error sending message" },
      ]);
    }
    setLoading(false);
  };

  const handleUserInput = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      handleSendMessage(userInput);
    } else if (e.key === "Enter") {
      e.preventDefault();
      setUserInput((prev) => prev + "\n");
    }
  };

  const handleCreateDraft = async () => {
    setActiveTabIndex(1); // Switch to the Draft tab
    setIsDraftReady(false);
  };

  const formatMessageContent = (content) => {
    if (!content) return null; // Check if content is valid
    const lines = content.split("\n").filter((line) => line.trim() !== "");

    return lines.map((line, index) => {
      if (line.startsWith("### ")) {
        return (
          <Heading as="h2" size="lg" mt={4} mb={2} key={index}>
            {line.replace("### ", "")}
          </Heading>
        );
      } else if (line.startsWith("#### ")) {
        return (
          <Heading as="h3" size="md" mt={3} mb={2} key={index}>
            {line.replace("#### ", "")}
          </Heading>
        );
      } else if (line.startsWith("- ")) {
        return (
          <Text as="li" ml={4} key={index}>
            {line.replace("- ", "")}
          </Text>
        );
      } else if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <Text as="strong" key={index}>
            {line.replace(/\*\*/g, "")}
          </Text>
        );
      } else {
        return (
          <Text mb={2} key={index}>
            {line}
          </Text>
        );
      }
    });
  };

  return (
    <Box flex="1" px={4} bg={"white"}>
      <Tabs
        variant="soft-rounded"
        colorScheme="orange"
        index={activeTabIndex}
        onChange={(index) => setActiveTabIndex(index)}
      >
        <Flex alignItems={"center"} justifyContent={"flex-start"}>
          {/* <Heading size="md" mr={8}>
            {sections[section]}
          </Heading> */}
          <TabList
            bg={"white"}
            width={"-webkit-fit-content"}
            borderRadius="4px"
            color={"#333333"}
          >
            <Tab
              _selected={{ color: "#C01F27", bg: "#FEF8F5" }}
              borderRadius="8px"
              // w={"107px"}
              py={2}
              px={4}
            >
              <HStack justifyContent={"center"}>
                <Image src={build} alt="Start New" boxSize="20px" />
                <Text >Build</Text>
              </HStack>
            </Tab>
            {section === "summary" ? (
              ""
            ) : (
              <Tab
                _selected={{ color: "#C01F27", bg: "#FEF8F5" }}
                borderRadius="0 0 0 0"
                // w={"107px"}
                py={2}
                px={4}
                isDisabled={draftContent ? false : isDraftReady ? false : true}
              >
                <HStack justifyContent={"center"}>
                  <Image src={draft} alt="Start New" boxSize="20px" />
                  <Text >Draft</Text>
                </HStack>
              </Tab>
            )}
            {section === "summary" ? (
              ""
            ) : (
              <Tab
                _selected={{ color: "#C01F27", bg: "#FEF8F5" }}
                borderRadius="0 4px 4px 0"
                // w={"107px"}
                py={2}
                px={4}
                isDisabled={!draftContent}
              >
                <HStack justifyContent={"center"}>
                  <Image src={Rec_icon} alt="Start New" boxSize="20px" />
                  <Text >Recommendation</Text>
                </HStack>
              </Tab>
            )}
          </TabList>
          {draftContent && activeTabIndex == 1 && (
            <PDFDownloadLink
              document={<GeneratePDFDocument content={draftContent} />}
              fileName={projectName + section + ".pdf"}
              style={{
                textDecoration: "none",
              }}
            >
              {({ loading }) =>
                loading ? (
                  <Button colorScheme="red" ml={3} isLoading>
                    Generating PDF...
                  </Button>
                ) : (
                  <Button
                    colorScheme="red"
                    ml={3}
                    variant="outline"
                    _hover={{ bg: "#BF2026", color: "white" }}
                    // leftIcon={
                    //   <Box as="span" className="material-icons">
                    //     download
                    //   </Box>
                    // }
                  >
                    Download Plan
                  </Button>
                )
              }
            </PDFDownloadLink>
          )}
          <Flex justify="space-between" ml={3}>
            {!mergedDraft && (
              <Button onClick={handleDownloadCompletePlan} colorScheme="red">
                Generate Business Plan
              </Button>
            )}

            {mergedDraft && (
              <PDFDownloadLink
                document={<GenerateCompletePDFDocument content={mergedDraft} />}
                fileName="complete_plan.pdf"
                style={{
                  textDecoration: "none",
                }}
              >
                {({ loading }) =>
                  loading ? (
                    <Button colorScheme="red" isLoading>
                      Generating PDF ...
                    </Button>
                  ) : (
                    <Button colorScheme="red">Click to Download Plan</Button>
                  )
                }
              </PDFDownloadLink>
            )}
          </Flex>
        </Flex>
        <Flex mt={4}>
          <TabPanels>
            <TabPanel p={0} mt={4}>
              <VStack
                spacing={4}
                align="start"
                width="100%"
                height="450px"
                maxHeight="450px"
              >
                <Box
                  ref={chatContainerRef}
                  flex="1"
                  width="100%"
                  overflowY="auto"
                  bg="white"
                  p={4}
                >
                  {chatHistory.length > 0 ? (
                    chatHistory.map((msg, index) => (
                      <Flex key={index} align="flex-start" mb={4}>
                        {msg.role === "user" ? (
                          <Avatar
                            h="24px"
                            fontSize={"15px"}
                            w="24px"
                            name="User"
                            bg="#FEE6D4"
                            color="#333"
                            mr={3}
                          />
                        ) : (
                          <Avatar h="24px" w="24px" src={genie_logo} mr={3} />
                        )}
                        <Box
                          bg={msg.role === "user" ? "white" : "#FEE6D4"}
                          p={msg.role === "user" ? 0 : 4}
                          borderRadius="md"
                          width="100%"
                        >
                          {formatMessageContent(msg.content)}
                        </Box>
                      </Flex>
                    ))
                  ) : (
                    <Box
                      display="flex"
                      alignItems="flex-end"
                      h="-webkit-fill-available"
                      justifyContent="center"
                    >
                      <Box
                        border="1px solid #FEE6D4"
                        borderRadius="md"
                        p={4}
                        bg="white"
                        onClick={() => handleSendMessage("Let's begin")}
                        cursor="pointer"
                        _hover={{ bg: "#FEE6D4" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text
                          w={"fit-content"}
                          color="#333333"
                          alignSelf="center"
                          justifyContent={"center"}
                        >
                          Let's begin
                        </Text>
                      </Box>
                    </Box>
                  )}
                </Box>
                <Box
                  bg="#FEE6D4"
                  borderRadius="8px"
                  padding="8px"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  border="1px solid #FEE6D44D"
                  mt={4}
                >
                  {/* <Input
                    placeholder="Type your response here..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleUserInput}
                    border="none"
                    focusBorderColor="none"
                    _focus={{ boxShadow: "none" }}
                    flex="1"
                    bg="white"
                    as="textarea"
                    rows={2} // Optional: adjusts initial height of the textarea
                    resize="none" // Optional: prevents resizing
                  /> */}

                  <Textarea
                    value={userInput}
                    onKeyDown={handleUserInput}
                    border="none"
                    focusBorderColor="none"
                    _focus={{ boxShadow: "none" }}
                    flex="1"
                    bg="white"
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your response here..."
                  />

                  <IconButton
                    icon={<ArrowUpIcon />}
                    aria-label="Send"
                    onClick={() => handleSendMessage(userInput)}
                    isLoading={loading}
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                  />
                </Box>
                {isDraftReady && (
                  <Button
                    colorScheme="orange"
                    onClick={handleCreateDraft}
                    isLoading={loading}
                  >
                    {loading ? "Creating Draft..." : "Continue"}
                  </Button>
                )}
              </VStack>
            </TabPanel>
            <TabPanel p={0} mt={4}>
              {loadingDraft ? (
                <Spinner size="xl" />
              ) : (
                <Draft
                  draftContent={draftContent}
                  projectName={projectName}
                  sectionName={section}
                  setDraftContent={setDraftContent}
                />
              )}
            </TabPanel>
            <TabPanel p={0} mt={4}>
              <ImproveSection
                projectName={projectName}
                section={section}
                draftContent={draftContent}
              />
            </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
    </Box>
  );
};

export default React.memo(PlanSection);
