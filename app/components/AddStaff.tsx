import { Button, Flex } from '@mantine/core'
interface AddStaffProp {
    StaffModalOpen: () => void;
}

const AddStaff = ({StaffModalOpen}:AddStaffProp) => {
  return (
    <Flex justify={'flex-end'}>
        <Button variant="filled" onClick={StaffModalOpen}>Add staff</Button>
    </Flex>
  )
}

export default AddStaff