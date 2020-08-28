const overlapDataInspactor = async (model, body) => {
  try {
    const { userName, email = null, phoneNumber = null } = body;
    let result = {
      userName: null,
      contact: null,
    };
    console.log('유니크데이터-중복검사');
    const searchUserName = await model.findOne({
      where: { userName },
    });
    searchUserName && (result.userName = 'userNameOverlap');

    if (email) {
      const searchEmail = await model.findOne({
        where: { email },
      });
      searchEmail && (result.contact = 'emailOverlap');
    }
    if (!email && phoneNumber) {
      const searchPhoneNumber = await model.findOne({
        where: { phoneNumber },
      });
      searchPhoneNumber && (result.contact = 'phoneNumberOverlap');
    }
    console.log('유니크데이터-중복검사-끝');
    return Object.keys(result).filter((key) => result[key] !== null).length > 0
      ? result
      : null;
  } catch (error) {
    console.log('유니크데이터-중복검사-에러');
    console.log(error);
    return 'overlap-data-inspactor-server-error';
  }
};
module.exports = {
  overlapDataInspactor,
};
