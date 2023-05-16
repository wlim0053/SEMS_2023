import React from "react";
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

// Data for Pie Chart
const dataPie = [
  { name: "SOIT", value: 400 },
  { name: "SOE", value: 300 },
  { name: "SOB", value: 300 },
  { name: "SOS", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

//Customize box style
const boxStyle = {
  color: "white",
  textAlign: "center",
  bg: "white",
  boxShadow: "2xl",
  rounded: "md",
  height: "470px",
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

const Admin = () => {
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
            <Select variant="outline" placeholder="Select option" width="70%">
              <option value="option1">MUMEC</option>
              <option value="option2">MUMTEC</option>
              <option value="option3">Monash Staff</option>
            </Select>
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
            <Bar dataKey="uv" fill="#2471A3" />
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
