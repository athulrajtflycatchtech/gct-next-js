import { Button, Flex } from '@mantine/core'
interface AddStaffProp {
    AddStaffModalOpen: () => void;
}

const AddStaff = ({AddStaffModalOpen}:AddStaffProp) => {
  return (
    <Flex justify={'flex-end'}>
        <Button variant="filled" onClick={AddStaffModalOpen}>Add staff</Button>
    </Flex>
  )
}

export default AddStaff