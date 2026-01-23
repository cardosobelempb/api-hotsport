import { BadRequestError } from '@/common'
import { CreateHostUseCase } from '@/routeros/application/usecases/create-host.usecase'
import { createHostBodySchema } from '@/routeros/application/usecases/schemas/create-host-body.schema'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import z from 'zod'

export async function createHostController(
  request: Request,
  response: Response,
) {
  const validateDate = createHostBodySchema.safeParse(request.body)

  if (!validateDate.success) {
    console.error('Invalid data', z.treeifyError(validateDate.error))
    throw new BadRequestError(
      `${validateDate.error.issues.map(issue => {
        return `${issue.path.join('.')} -> ${issue.message}`
      })}`,
    )
  }

  const { address, macAddress, server, status, user, comment, toAddress } =
    validateDate.data

  const createHostUseCase: CreateHostUseCase.UseCase =
    container.resolve('CreateHostUseCase')

  const host = await createHostUseCase.execute({
    address,
    macAddress,
    server,
    status,
    user,
    comment: comment ?? '',
    toAddress: toAddress ?? '',
  })

  return response.status(201).json(host)
}
