'use strict';

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { Role } = require('../../app/models');

const names = [
    'Johnny',
    'Adji',
    'Fikri',
    'Brian',
    'Ranggawarsita',
    'Jayabaya',
    'Pahrurozi',
];

module.exports = {
    async up(queryInterface, Sequelize) {
        const password = '123456';
        const encryptedPassword = bcrypt.hashSync(password, 10);
        const timestamp = new Date();

        const role = await Role.findOne({
            where: {
                name: 'CUSTOMER',
            },
        });

        const users = names.map((name) => ({
            name,
            email: `${name.toLowerCase()}@binar.co.id`,
            encryptedPassword,
            roleId: (name === 'Pahrurozi') ? 2 : role.id,
            createdAt: timestamp,
            updatedAt: timestamp,
        }));

        await queryInterface.bulkInsert('Users', users, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', { name: { [Op.in]: names } }, {});
    },
};
