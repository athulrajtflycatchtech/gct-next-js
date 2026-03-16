// import { Modal, Box } from "@mantine/core";

// interface StaffModalProp {
//   close: () => void;
//   opened: boolean;
// }

// const EditStaffModal = ({ opened, close }: StaffModalProp) => {
//   return (
//     <>
//       <Modal opened={opened} onClose={close} title="Authentication">
//         {/* Modal content */}
//         <Box>

//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default EditStaffModal;


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

interface StaffModalProp {
  close: () => void;
  opened: boolean;
}

const EditStaffModal = ({ opened, close }: StaffModalProp) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" size={911}>
        <Box>
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Flex gap={15} mt={8}>
              <Flex gap="md" wrap="wrap" flex={1}>
                <TextInput
                  label="First Name"
                  flex={1}
                  h={42}
                  placeholder="Type..."
                />
                <TextInput
                  label="Last Name"
                  flex={1}
                  h={42}
                  placeholder="Type..."
                />
              </Flex>
              <TextInput
                label="Email"
                flex={1}
                type="email"
                h={42}
                placeholder="Type..."
              />
            </Flex>

            <Flex gap="md" wrap="wrap" mt={35}>
              <TextInput
                label="Username"
                flex={1}
                h={42}
                placeholder="Type..."
              />
              <PasswordInput
                label="Password"
                flex={1}
                h={42}
                placeholder="xxxxxxxxxxxxxxx"
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
                  placeholder="Enter phone number"
                  value={''}
                  onChange={(value) => form.setFieldValue("phone", value || "")}
                  defaultCountry="IN"
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
              />
              <TextInput
                label="Street Address 2"
                flex={1}
                h={42}
                placeholder="Type..."
              />
            </Flex>

            <Flex gap="md" wrap="wrap" mt={35}>
              <TextInput label="City" flex={1} h={42} placeholder="Type..." />
              <TextInput
                label="District"
                flex={1}
                h={42}
                placeholder="Type..."
              />
              <TextInput
                label="State"
                flex={1}
                h={42}
                placeholder="Type..."
              />
              <NumberInput
                hideControls
                label="Postal Code"
                flex={1}
                h={42}
                placeholder="Type..."
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

export default EditStaffModal;
