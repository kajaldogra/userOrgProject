import express from 'express'
const organisationRouter = express.Router()
import{createOrganisation,listOfOrg,updateOrg} from '../controller/organisation_controller'

organisationRouter.post('/add',createOrganisation)
organisationRouter.get('/list/:userId',listOfOrg)
organisationRouter.put('/edit/:id',updateOrg)

export default organisationRouter