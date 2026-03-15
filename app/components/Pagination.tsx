import { Pagination } from "@mantine/core";

interface PaginationProps {
  total: number;
  page: number;
  onChange: (page: number) => void;
}

const PaginationPage = ({ total, page, onChange }: PaginationProps) => {
  return (
    <div>
      <Pagination total={total} value={page} onChange={onChange} mt="md" />
    </div>
  );
};

export default PaginationPage;
