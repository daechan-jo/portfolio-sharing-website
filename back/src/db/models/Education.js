import { educationModel } from "../schemas/education";
const { ObjectId } = require("mongoose").Types;
class Education {
  static async create(newEducation) {
    const createdNewEducation = await educationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findByName(schoolName) {
    console.log(schoolName);
    const name = await educationModel.findOne(schoolName);
    console.log(name);
    return name;
  }
  static async findByMajor(Major) {
    const major = await educationModel.findOne(Major);

    return major;
  }
  static async findByPresent(Crnt) {
    const crnt = await educationModel.findOne(Crnt);
    return crnt;
  }
  // 수정필요
  static async findUser(userId) {
    // console.log(userId);
    // const a = await UserModel.find({ id: userId });
    // console.log(a);
    // const ids = a.map(user => user._id);
    // console.log(ids);
    // const Education = await educationModel.find({ _id: { $eq: ids } });
    // return Education;
    const education = await educationModel.find({ author: userId });
    return education;
  }

  static async findById(educationId) {
    const education = await educationModel.findOne({ author: educationId });
    return education;
  }

  static async update(educationId, fieldToUpdate, newValue) {
    const transformedUser = {
      ...educationId,
      _id: ObjectId(educationId.id),
    };
    const id = { id: transformedUser };
    const data = { [fieldToUpdate]: newValue };
    const updatedEducation = await educationModel.findOneAndUpdate(id, data);
    return updatedEducation;
  }

  static async delete(educationId) {
    const deletedId = await educationModel.findOneAndDelete({
      author: educationId,
    });
    return deletedId;
  }
}

export { Education };
