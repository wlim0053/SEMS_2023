import React from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { Route, Outlet } from 'react-router-dom';

function Admin() {
  return (
    <>
      <Wrap>
        {["elevated", "outline", "filled", "unstyled"].map((variant) => (
          <Card variant={variant} w='20em
          '>
            <CardHeader>Header</CardHeader>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
              dolor est nulla quidem saepe quo eligendi sunt voluptatem porro
              ullam optio, veniam praesentium laboriosam. Soluta aliquam, ut
              quae similique fugiat culpa quasi veniam optio praesentium
              perferendis, labore repellendus deleniti omnis sequi enim? Cumque
              mollitia sed, molestiae quod sunt dolore ex!
            </CardBody>
          </Card>
        ))}
        {/* Render the nested routes using Outlet */}
      <Outlet />
      </Wrap>
    </>
  );
};

export default Admin;
