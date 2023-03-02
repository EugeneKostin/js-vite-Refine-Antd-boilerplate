import {
    EditButton,
    FilterDropdown,
    List,
    Radio,
    Select,
    ShowButton,
    Space,
    Table,
    TagField,
    TextField,
    useSelect,
    useTable,
} from '@pankod/refine-antd'
import { getDefaultFilter, useMany } from '@pankod/refine-core'
import { useCallback } from 'react'

const CategoryFilter = ({ dropdownProps, filters }) => {
    const { selectProps: categorySelectProps } = useSelect({
        resource: 'categories',
        optionLabel: 'title',
        optionValue: 'id',
        defaultValue: getDefaultFilter('category.id', filters, 'in'),
    })

    return (
        <FilterDropdown {...dropdownProps} mapValue={(selectedKeys) => selectedKeys.map(Number)}>
            <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...categorySelectProps}
            />
        </FilterDropdown>
    )
}

export const PostList = () => {
    const { tableProps, filters } = useTable({
        syncWithLocation: true,
    })

    const categoryIds = tableProps?.dataSource?.map((item) => item.category.id) ?? []

    const { data, isLoading } = useMany({
        resource: 'categories',
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    })

    const CategoryFilterComponent = useCallback(
        (props) => <CategoryFilter dropdownProps={props} filters={filters} />,
        [filters]
    )

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex={['category', 'id']}
                    title="Category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />
                        }

                        return (
                            <TextField
                                value={data?.data.find((item) => item.id === value)?.title}
                            />
                        )
                    }}
                    filterDropdown={CategoryFilterComponent}
                    defaultFilteredValue={getDefaultFilter('category.id', filters, 'in')}
                />
                <Table.Column
                    dataIndex="status"
                    title="Status"
                    render={(value) => <TagField value={value} />}
                    // eslint-disable-next-line react/no-unstable-nested-components
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Radio.Group>
                                <Radio value="published">Published</Radio>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton hideText size="small" recordItemId={record.id} />
                            <ShowButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    )
}
