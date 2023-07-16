import { crtfcAuthService } from "../services/crtfcService";
const httpStatus = require('http-status-codes');

const sendResponse = function (res, statusCode, data) {
    res.status(statusCode).json(data);
};

const postCrtfc = async (req,res) => {
    try{
        const author = req.currentUserId;

        const addMyCrtfc = await crtfcAuthService.addCrtfc({toCreate : {...req.body,author}});

        return sendResponse(res, httpStatus.OK, addMyCrtfc);
    }catch (err) {
        console.error('Erro: ' + err);
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

const getMyCrtfc = async (req,res) =>{
    try{

        const myCrtfc = await crtfcAuthService.getCrtfc(req.currentUserId);

        return sendResponse(res, httpStatus.OK, myCrtfc);
    }catch (err) {
    console.error('Erro: ' + err);
    return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}


const getUserCrtfc = async (req,res) =>{
    try{
        const userCrtfc = await crtfcAuthService.getCrtfc(req.params.userId);
        return sendResponse(res, httpStatus.OK, userCrtfc);
    }catch (err) {
    console.error('Erro: ' + err);
    return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

const putCrtfc = async (req,res)=>{
    try{
        const id = req.params.crtfcId;

        const updatedCrtfc = await crtfcAuthService.setCrtfc(id,{toUpdate: {...req.body}});

        return sendResponse(res, httpStatus.OK, updatedCrtfc);
    
    }catch (err) {
        console.error('Erro: ' + err);
        return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

const deleteCrtfc = async (req,res)=>{
    try{
        const deleteCrtfc = await crtfcAuthService.deleteCrtfc(req.params.crtfcId);
        return sendResponse(res, httpStatus.OK, deleteCrtfc);
    }catch (err) {
    console.error('Erro: ' + err);
    return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, {});
    }
}

export { postCrtfc, getMyCrtfc, getUserCrtfc, putCrtfc, deleteCrtfc};