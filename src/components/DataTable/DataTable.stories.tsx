import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { DataTable, Column } from "./DataTable";

type Row = { id: number; name: string; age: number };

const data: Row[] = [
  { id: 1, name: "Alice", age: 24 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 22 },
];

const columns: Column<Row>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const meta: Meta<typeof DataTable<Row>> = {
  title: "Components/DataTable",
  component: DataTable<Row>,
};
export default meta;

type Story = StoryObj<typeof DataTable<Row>>;

export const Default: Story = {
  args: { data, columns, loading: false, selectable: true },
};

export const Loading: Story = {
  args: { data: [], columns, loading: true },
};

export const Empty: Story = {
  args: { data: [], columns, loading: false },
};
