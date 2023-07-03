import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Container,
  Flex,
  Grid,
  GridItem,
  Center,
  Spacer,
  Text,
  Wrap,
  WrapItem,
  Stack,
  Select,
  Image,
  HStack,
  Button,
  filter,
} from "@chakra-ui/react";

import { CalendarIcon } from "@chakra-ui/icons";
import { BiGroup, BiExport } from "react-icons/bi";
import { IconContext } from "react-icons";

import {
  BarChart,
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Spinner } from "@chakra-ui/react";
import { Route, Outlet } from "react-router-dom";
import api from "../../utils/api";
import SimpleBarChart from "../../components/admin/SimpleBarChart";

/*
/api/stats/organiser/event-count?semester=true&year=2023&organiser=parent
*/
const Admin = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const data1 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
  ];

  // Data for Pie Chart
  const dataPie = [
    { name: "SOIT", value: 400 },
    { name: "SOE", value: 300 },
    { name: "SOB", value: 300 },
    { name: "SOS", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = (props: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius =
      props.innerRadius + (props.outerRadius - props.innerRadius) * 0.5;
    const x = props.cx + radius * Math.cos(-props.midAngle * RADIAN);
    const y = props.cy + radius * Math.sin(-props.midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > props.cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(props.percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const [semester, setSemester] = useState("true");

  const [errorMessage, setErrorMessage] = useState("");

  const [eventCount, setEventCount] = useState([]);
  const [eventCountFiltered, setEventCountFiltered] = useState([]);

  const [parentClubSelection, setParentClubSelection] = useState<
    Object[] | null
  >(null);

  //get event count stats from api
  const fetchEventCount = async () => {
    try {
      const response = await api.get(
        "/stats/organiser/event-count?semester=true&year=2023&organiser=parent"
      );
      setEventCount(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterEventCount = async (selectedOrganiser: string) => {
    let filtered: any = [];
    if (selectedOrganiser === "") {
      setErrorMessage("Please select a club to show chart!");
    } else {
      setErrorMessage("");
    }
    for (let i = 0; i < eventCount.length; i++) {
      if (eventCount[i].organiser_name === selectedOrganiser) {
        filtered.push(eventCount[i]);
      }
    }
    setEventCountFiltered(filtered);
    console.log(filtered);
  };

  useEffect(() => {
    fetchEventCount();
  }, []);

  //api.get(`/stats/organiser/event-count?semester=${semester}&year=2023&organiser=child`)

  //Customize box style
  const boxStyle = {
    color: "white",
    textAlign: "center",
    bg: "white",
    boxShadow: "2xl",
    rounded: "md",
    height: "530px",
    mr: "10px",
  };

  const infoBoxStyle = {
    color: "white",
    textAlign: "left",
    fontSize: "1.5rem",
    fontWeight: "500",
    textColor: "black",
    // bg: "white",
    // boxShadow: "md",
    // rounded: "md",
    p: "20px",
    height: "430px",
    mr: "10px",
  };

  const boxHeaderStyle = {
    textAlign: "center",
    fontSize: ["lg", "xl", "2xl"],
    //fontSize: "1.5rem",
    fontWeight: "500",
    p: "5px",
    bg: "white",
    borderTopRadius: "8px 8px",
    height: "78px",
    background: "#006DAE",
  };

  return (
    <SimpleGrid
      bg="gray.40"
      p="6"
      spacing={10}
      textAlign="center"
      minChildWidth="540px"
      columns={2}
    >
      {/* //1st Box */}
      <Box width="100%">
        <Box sx={infoBoxStyle}>
          <SimpleGrid columns={2} p={5} fontSize={"2rem"} fontWeight="500">
            Admin Dashboard
          </SimpleGrid>

          {/* Continue here using grid */}
          <Grid
            h="200px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
            mt="20px"
            ml="20px"
          >
            <GridItem colSpan={2}>
              <Box>
                <HStack alignItems="center" gridGap="8px">
                  <CalendarIcon boxSize={9} color="blue.500"></CalendarIcon>
                  <Text fontSize="2xl">124 events</Text>
                </HStack>
              </Box>
            </GridItem>
            <GridItem colSpan={2}>
              <Box>
                <HStack alignItems="center" gridGap="8px">
                  <IconContext.Provider
                    value={{ color: "green", size: "44px" }}
                  >
                    <div>
                      <BiGroup />
                    </div>
                  </IconContext.Provider>
                  <Text fontSize="2xl">250 attendees</Text>
                </HStack>
              </Box>
            </GridItem>
            <GridItem colSpan={4} bg="white" />
          </Grid>
        </Box>
      </Box>

      {/* //Graph Box */}

      {/* First Graph */}
      <Box sx={boxStyle}>
        <Box sx={boxHeaderStyle}>Number of events per semester</Box>
        <Select
          variant="outline"
          textColor="black"
          width="30%"
          p="3"
          onChange={(e) => {
            filterEventCount(e.target.value);
          }}
        >
          <option value="">Select option</option>
          <option value="MUMEC">MUMEC</option>
          <option value="MUMTEC">MUMTEC</option>
        </Select>
        <Text textColor="black">{errorMessage}</Text>
        <Center>
          <SimpleBarChart data={eventCountFiltered}></SimpleBarChart>
        </Center>
        <Button
          variant="solid"
          colorScheme="blue"
          leftIcon={<BiExport />}
          mt="4"
        >
          Export
        </Button>
      </Box>

      {/* Second graph */}
      <Box sx={boxStyle}>
        <Box sx={boxHeaderStyle}>
          Number of students from each specialization
        </Box>
        <Center>
          <PieChart width={400} height={300}>
            <Pie
              data={dataPie}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Center>
        <Button
          variant="solid"
          colorScheme="blue"
          leftIcon={<BiExport />}
          mt="5"
        >
          Export
        </Button>
      </Box>

      {/* Third graph */}
      <Box sx={boxStyle}>
        <Box sx={boxHeaderStyle}>Number of males and females per event</Box>
        <Center>
          <LineChart
            width={460}
            height={300}
            data={data}
            margin={{
              top: 25,
              right: 30,
              left: 15,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </Center>
        <Button
          variant="solid"
          colorScheme="blue"
          leftIcon={<BiExport />}
          mt="5"
        >
          Export
        </Button>
      </Box>

      {/* Forth graph */}
      <Box sx={boxStyle}>
        <Box sx={boxHeaderStyle}>Number of males and females per semester</Box>
        <Center>
          <BarChart
            width={460}
            height={300}
            data={data}
            margin={{
              top: 25,
              right: 30,
              left: 15,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
          </BarChart>
        </Center>
        <Button
          variant="solid"
          colorScheme="blue"
          leftIcon={<BiExport />}
          mt="5"
        >
          Export
        </Button>
      </Box>
      <Box sx={boxStyle}>
        <Box sx={boxHeaderStyle}></Box>
      </Box>
      <Outlet />
    </SimpleGrid>
  );
};

export default Admin;
