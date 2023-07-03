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
} from "@chakra-ui/react";
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

export default function SimpleBarChart({ data }) {
  return (
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
      <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
      <XAxis dataKey="sem" />
      <YAxis dataKey="event_count" />
      <Bar dataKey="event_count" fill="#2471A3" />
    </BarChart>
  );
}
