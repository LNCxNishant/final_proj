import { useFormCreateManySlots } from '@autospace/forms/src/createSlots'
import { useMutation } from '@apollo/client'
import {
  CreateManySlotsDocument,
  SlotType,
  namedOperations,
} from '@autospace/network/src/gql/generated'
import { useState } from 'react'
import { Button } from '../atoms/Button'
import { Dialog } from '../atoms/Dialog'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlSelect } from '../atoms/HtmlSelect'
import { HtmlInput } from '../atoms/HtmlInput'
import { Form } from '../atoms/Form'
import { toast } from '../molecules/Toast'
import { FieldError } from 'react-hook-form'

// Define the mapping between parking levels and SlotType enums
const parkingLevels = [
  { label: 'L1', value: SlotType.Bicycle },
  { label: 'L2', value: SlotType.Bike },
  { label: 'L3', value: SlotType.Car },
  { label: 'L4', value: SlotType.Heavy },
]

export const CreateManySlotsDialog = ({ garageId }: { garageId: number }) => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormCreateManySlots()

  const [createManySlots, { loading }] = useMutation(CreateManySlotsDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.Garages],
    onCompleted() {
      setOpen(false)
      toast('Slots created successfully.')
    },
    onError() {
      toast('Action failed.')
    },
  })

  return (
    <>
      <Button
        variant="text"
        size="none"
        onClick={() => setOpen(true)}
        className="w-16 h-10 border-2 group border-primary"
      >
        <div className="transition-transform duration-300 group-hover:scale-150">
          +
        </div>
      </Button>
      <Dialog open={open} setOpen={setOpen} title={'Create slot'}>
        <Form
          onSubmit={handleSubmit(async ({ count, ...data }) => {
            await createManySlots({
              variables: { count, createSlotInput: { ...data, garageId } },
            })
          })}
        >
          <div className="grid grid-cols-2 gap-2">
            <HtmlLabel
              title="Parking Level"
              error={(errors.type as FieldError)?.message || ''}
            >
              <HtmlSelect placeholder="Parking Level" {...register(`type`)}>
                {parkingLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </HtmlSelect>
            </HtmlLabel>
            <HtmlLabel title="Price/hr" error={errors.pricePerHour?.message}>
              <HtmlInput
                type="number"
                placeholder="Price per hour"
                {...register(`pricePerHour`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <HtmlLabel title="Number of slots" error={errors.count?.message}>
              <HtmlInput
                type="number"
                placeholder="Enter the number of slots"
                {...register(`count`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <HtmlLabel title="Length" error={errors.length?.message}>
              <HtmlInput
                type="number"
                placeholder="Enter the length in ft"
                {...register('length', {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <HtmlLabel title="Width" error={errors.width?.message}>
              <HtmlInput
                type="number"
                placeholder="Enter the width in ft"
                {...register(`width`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <HtmlLabel title="Height" error={errors.height?.message}>
              <HtmlInput
                type="number"
                placeholder="Enter the height in ft"
                {...register(`height`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <Button type="submit" loading={loading}>
              Submit
            </Button>
          </div>
        </Form>
      </Dialog>
    </>
  )
}
