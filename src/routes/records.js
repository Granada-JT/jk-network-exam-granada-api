import express from 'express';
import {
	addRecord,
	deleteRecord,
	getRecord,
	getRecords,
	updateRecord
} from '../controllers/recordsController.js'

const router = express.Router();

router.get('/', getRecords);
router.get('/:recordId', getRecord);
router.post('/add', addRecord);
router.patch('/update/:recordId', updateRecord)
router.delete('/delete/:recordId', deleteRecord);

export default router;