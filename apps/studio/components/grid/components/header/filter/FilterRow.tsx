import { ChevronDown, X } from 'lucide-react'
import { KeyboardEvent, memo } from 'react'

import { DropdownControl } from 'components/grid/components/common/DropdownControl'
import type { Filter, FilterOperator } from 'components/grid/types'
import { useTableEditorTableStateSnapshot } from 'state/table-editor-table'
import { Button, Input } from 'ui'
import { FilterOperatorOptions } from './Filter.constants'

export interface FilterRowProps {
  filterIdx: number
  filter: Filter
  onChange: (index: number, filter: Filter) => void
  onDelete: (index: number) => void
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
}

const FilterRow = ({ filter, filterIdx, onChange, onDelete, onKeyDown }: FilterRowProps) => {
  const snap = useTableEditorTableStateSnapshot()
  const column = snap.table.columns.find((x) => x.name === filter.column)
  const columnOptions =
    snap.table.columns?.map((x) => {
      return { value: x.name, label: x.name, postLabel: x.dataType }
    }) || []

  const placeholder =
    column?.format === 'timestamptz'
      ? 'yyyy-mm-dd hh:mm:ss+zz'
      : column?.format === 'timestamp'
        ? 'yyyy-mm-dd hh:mm:ss'
        : 'Enter a value'

  return (
    <div className="flex w-full items-center justify-between gap-x-1 px-3">
      <DropdownControl
        align="start"
        options={columnOptions}
        onSelect={(nextColumn) => onChange(filterIdx, { ...filter, column: nextColumn as string })}
      >
        <Button
          asChild
          type="outline"
          icon={
            <div className="text-foreground-lighter">
              <ChevronDown strokeWidth={1.5} />
            </div>
          }
          className="w-32 justify-start"
        >
          <span>{column?.name ?? ''}</span>
        </Button>
      </DropdownControl>
      <DropdownControl
        align="start"
        options={FilterOperatorOptions}
        onSelect={(nextOperator) =>
          onChange(filterIdx, {
            ...filter,
            operator: nextOperator as FilterOperator,
          })
        }
      >
        <Button
          asChild
          type="outline"
          icon={
            <div className="text-foreground-lighter">
              <ChevronDown strokeWidth={1.5} />
            </div>
          }
        >
          <span>{filter.operator}</span>
        </Button>
      </DropdownControl>
      <Input
        size="tiny"
        className="w-full"
        placeholder={placeholder}
        value={filter.value}
        onChange={(event) =>
          onChange(filterIdx, {
            ...filter,
            value: event.target.value,
          })
        }
        onKeyDown={onKeyDown}
      />
      <Button
        type="text"
        className="px-1"
        icon={<X strokeWidth={1.5} />}
        onClick={() => onDelete(filterIdx)}
      />
    </div>
  )
}
export default memo(FilterRow)
