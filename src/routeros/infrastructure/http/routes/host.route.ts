import { Router } from 'express'

import { createHostController } from '../controllers/create-host.controller'

const routerHost = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Host:
 *       type: object
 *       required:
 *         - macAddress
 *         - address
 *         - server
 *         - user
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id (uuid) of the host
 *         macAddress:
 *           type: string
 *           description: The MAC address of the host
 *         address:
 *           type: string
 *           description: The IP address of the host
 *         server:
 *           type: string
 *           description: The server associated with the host
 *         user:
 *           type: string
 *           description: The user associated with the host
 *         status:
 *           type: string
 *           description: The status of the host
 *         comment:
 *           type: string
 *           description: Additional comments about the host
 *         toAddress:
 *           type: string
 *           description: The destination address for the host
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the host was added
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date the host was last updated
 *       example:
 *         id: 123e4567-e89b-12d3-a456-426614174000
 *         macAddress: "00:1A:2B:3C:4D:5E"
 *         address: "192.168.1.100"
 *         server: "server-01"
 *         user: "john.doe"
 *         status: "active"
 *         comment: "This is a sample host entry."
 *         toAddress: "192.168.1.200"
 *         created_at: 2023-01-01T10:00:00Z
 *         updated_at: 2023-01-01T10:00:00Z
 */

/**
 * @swagger
 * tags:
 *   name: Hosts
 *   description: The host managing API
 */

/**
 * @swagger
 * /hosts:
 *   post:
 *     summary: Create a new host
 *     tags: [Hosts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Host'
 *     responses:
 *       201:
 *         description: The host was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Host'
 *       400:
 *         description: Input data not provided or invalid
 *       409:
 *         description: Name already used on another host
 */
routerHost.post('/', createHostController)

export { routerHost }
