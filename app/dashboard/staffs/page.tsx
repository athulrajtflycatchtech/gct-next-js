"use client";

import {
  useDeleteStaffMutation,
  useStaffListQuery,
} from "@/app/apiServices/StaffServices";
import AddStaff from "@/app/components/AddStaff";
import PaginationPage from "@/app/components/Pagination";
import RoleGuard from "@/app/components/RoleGuard";
import { Box, Flex, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
// import EditStaffModal from "@/app/components/EditStaffModal";
import StaffModal from "@/app/components/StaffModal";

const StaffPage = () => {
  const [StaffModalOpened, { open: StaffModalOpen, close: StaffModalClose }] =
    useDisclosure(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { mutate: deleteStaff } = useDeleteStaffMutation();

  const handleDelete = (id: number) => {
    deleteStaff(id);
  };

  const [page, setPage] = useState(1);

  const { data } = useStaffListQuery(page);

  const staffs = data?.results || [];

  const totalPages = Math.ceil((data?.count || 0) / 15);

  return (
    <RoleGuard allowedRoles={["super_admin"]}>
      <Box>
        <AddStaff
          StaffModalOpen={() => {
            setSelectedId(null); // 🔥 VERY IMPORTANT
            StaffModalOpen();
          }}
        />
      </Box>
      <Box>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Full Name</Table.Th>
              <Table.Th>Address</Table.Th>
              <Table.Th>Contact Number</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Branch</Table.Th>
              <Table.Th>Username</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {staffs.map((staff) => (
              <Table.Tr key={staff.id}>
                <Table.Td>{staff.full_name}</Table.Td>
                <Table.Td>{staff.address}</Table.Td>
                <Table.Td>{staff.contact_number}</Table.Td>
                <Table.Td>{staff.email_address}</Table.Td>
                <Table.Td>{staff.branch ?? "-"}</Table.Td>
                <Table.Td>{staff.username ?? "-"}</Table.Td>
                <Table.Td>{staff.status}</Table.Td>
                <Table.Td>
                  <Flex gap={30}>
                    <Text
                      onClick={() => {
                        setSelectedId(staff.id); // 🔥 EDIT MODE
                        StaffModalOpen();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Edit
                    </Text>
                    <Text
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(staff.id)}
                    >
                      Delete
                    </Text>
                  </Flex>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <PaginationPage total={totalPages} page={page} onChange={setPage} />
      </Box>
      {/* <EditStaffModal close={close} opened={opened} /> */}
      <StaffModal
        StaffModalOpened={StaffModalOpened}
        StaffModalClose={StaffModalClose}
        staffId={selectedId}
      />
    </RoleGuard>
  );
};

export default StaffPage;
