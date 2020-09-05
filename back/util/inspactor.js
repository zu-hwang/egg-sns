const { request } = require('http');
const validation = require('./inputValidation');

module.exports = {
  overlapDetail: async (model, body) => {
    try {
      const { userName, email, phoneNumber } = body;
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
      return Object.keys(result).filter((key) => result[key] !== null).length >
        0
        ? result
        : null;
    } catch (error) {
      console.log('유니크데이터-중복검사-에러');
      console.log(error);
      return 'overlap-data-inspactor-server-error';
    }
  },
  overlap: async (model, body) => {
    // contact, userName, email, phoneNumber 일때 검사
    const userName =
      body.userName &&
      (await model.findOne({ where: { userName: body.userName } }));
    if (userName) return 'overlapError';
    const email =
      body.email && (await model.findOne({ where: { email: body.email } }));
    if (email) return 'overlapError';
    const phoneNumber =
      body.phoneNumber &&
      (await model.findOne({ where: { phoneNumber: body.phoneNumber } }));
    if (phoneNumber) return 'overlapError';
    if (body.contact) {
      let contact =
        body.contact &&
        (await model.findOne({ where: { email: body.contact } }));
      if (!contact)
        contact = await model.findOne({ where: { phoneNumber: body.contact } });
      if (contact) return 'overlapError';
    }
    return null;
  },
};
