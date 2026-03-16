/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Group,
  TextInput,
  Modal,
  Box,
  Flex,
  PasswordInput,
  Text,
  Select,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useAddStaffMutation } from "../apiServices/StaffServices";

interface AddStaffModalProp {
  AddStaffModalOpened: boolean;
  AddStaffModalClose: () => void;
}

const AddStaffModal = ({
  AddStaffModalOpened,
  AddStaffModalClose,
}: AddStaffModalProp) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      first_name: "",
      last_name: "",
      email_address: "",
      username: "",
      password: "",
      branch: 1,
      contact_number: "",
      street_address_1: "",
      street_address_2: "",
      city: "",
      district: "",
      state: "",
      postal_code: "",
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    // },
  });
  const { mutate: addStaff, isPending } = useAddStaffMutation();

  const handleSubmit = (values: typeof form.values) => {

  addStaff(
    {
      ...values,
      role: "staff", // 🔥 important
    },
    {
      onSuccess: () => {
        AddStaffModalClose(); // close modal
        form.reset(); // clear form
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );
};
  return (
    <>
      <Modal
        opened={AddStaffModalOpened}
        onClose={AddStaffModalClose}
        title="Authentication"
        centered
        size="911px"
      >
        <Box>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex gap={15} mt={8}>
              <Flex gap="md" wrap="wrap" flex={1}>
                <TextInput
                  label="First Name"
                  flex={1}
                  h={42}
                  placeholder="Type..."
                  {...form.getInputProps("first_name")}
                />
                <TextInput
                  label="Last Name"
                  flex={1}
                  h={42}
                  placeholder="Type..."
                  {...form.getInputProps("last_name")}
                />
              </Flex>
              <TextInput
                label="Email"
                flex={1}
                type="email"
                h={42}
                placeholder="Type..."
                {...form.getInputProps("email_address")}
              />
            </Flex>

            <Flex gap="md" wrap="wrap" mt={35}>
              <TextInput
                label="Username"
                flex={1}
                h={42}
                placeholder="Type..."
                {...form.getInputProps("username")}
              />
              <PasswordInput
                label="Password"
                flex={1}
                h={42}
                placeholder="xxxxxxxxxxxxxxx"
                {...form.getInputProps("password")}
              />
            </Flex>

            <Flex gap="md" wrap="wrap" mt={35}>
              <Box style={{ flex: 1 }}>
                <Text className="fs-16" c="var(--dark-200)" fw={500} mb={4}>
                  Branch
                </Text>
                <Select
                  placeholder="Pick value"
                  data={["React", "Angular", "Vue", "Svelte"]}
                />
              </Box>
              <Box style={{ flex: 1 }}>
                <Text className="fs-16" c="var(--dark-200)" fw={500} mb={4}>
                  Contact Number
                </Text>
                <PhoneInput
                  value={form.values.contact_number}
                  onChange={(value) =>
                    form.setFieldValue("contact_number", value || "")
                  }
                />
                {form.errors.phone && (
                  <Text c={"var(--primary-400)"}>{form.errors.phone}</Text>
                )}
              </Box>
            </Flex>

            <Flex gap="md" wrap="wrap" mt={12}>
              <TextInput
                label="Street Address 1"
                flex={1}
                h={42}
                placeholder="Type..."
                {...form.getInputProps("street_address_1")}
              />
              <TextInput
                label="Street Address 2"
                flex={1}
                h={42}
                placeholder="Type..."
                {...form.getInputProps("street_address_2")}
              />
            </Flex>

            <Flex gap="md" wrap="wrap" mt={35}>
              <TextInput
                label="City"
                flex={1}
                h={42}
                placeholder="Type..."
                {...form.getInputProps("city")}
              />
              <TextInput
                label="District"
                flex={1}
                h={42}
                placeholder="Type..."
                {...form.getInputProps("district")}
              />
              <TextInput
                label="State"
                flex={1}
                h={42}
                placeholder="Type..."
                {...form.getInputProps("state")}
              />
              <NumberInput
                hideControls
                label="Postal Code"
                flex={1}
                h={42}
                placeholder="Type..."
                {...form.getInputProps("postal_code")}
              />
            </Flex>

            <Group justify="flex-end" mt="2rem">
              <Button type="submit">Save</Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddStaffModal;
