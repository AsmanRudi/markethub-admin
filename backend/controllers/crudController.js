const bcrypt = require("bcryptjs");

const forbiddenFields = new Set([
    "_id",
    "__v",
    "us_id",
    "pd_id",
    "ct_id",
    "or_id",
]);


const createCrudController = (Model, idField, options = {}) => {
    const cleanInput = (body) => {
        const data = { ...body };

        for (const field of forbiddenFields) {
            delete data[field];
        }

        if (options.user) {
            delete data.us_created_at;
            delete data.us_updated_at;
        }

        return data;
    };

    return {
        getAll: async (req, res) => {
            try {
                const data = await Model.find().sort({ createdAt: -1 });
                res.json({ success: true, data });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        },

        getById: async (req, res) => {
            try {
                const item = await Model.findOne({
                    [idField]: req.params.id,
                });

                if (!item) {
                    return res.status(404).json({
                        success: false,
                        message: "Data tidak ditemukan",
                    });
                }

                res.json({ success: true, data: item });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        },


        create: async (req, res) => {
            try {
                const data = cleanInput(req.body);

                if (options.user && data.us_passsword) {
                    data.us_password = await bcrypt.hash(data.us_password, 12);
                }

                const item = await Model.create(data);

                res.status(201).json({
                    success: true,
                    message: "Data berhasil ditambahkan",
                    data: item,
                });
            } catch (error) {
                const duplicate = error.code === 11000;

                res.status(duplicate ? 409 : 400).json({
                    success: false,
                    message: duplicate
                    ? "Kode atau email sudah digunakan"
                    : error.message,
                });
            }
        },

         // UPDATE
    update: async (req, res) => {
      try {
        const data = cleanInput(req.body);

        if (options.user) {
          if (data.us_password) {
            data.us_password = await bcrypt.hash(
              data.us_password,
              12
            );
          } else {
            delete data.us_password;
          }
        }

        const item = await Model.findOneAndUpdate(
          { [idField]: req.params.id },
          { $set: data },
          {
            returnDocument: "after",
            runValidators: true,
          }
        );

        if (!item) {
          return res.status(404).json({
            success: false,
            message: "Data tidak ditemukan",
          });
        }

        return res.json({
          success: true,
          message: "Data berhasil diperbarui",
          data: item,
        });
      } catch (error) {
        return res.status(
          error.code === 11000 ? 409 : 400
        ).json({
          success: false,
          message: error.message,
        });
      }
    },

        remove: async (req, res) => {
            try {
                const item = await Model.findOneAndUpdate({
                    [idField]: req.params.id,
                });

                if (!item) {
                    return res.status(404).json({
                        success: false,
                        message: "Data tidak ditemukan",
                    });
                }

                res.json({
                    success: true,
                    message: "Data berhasil dihapus",
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        },
    };
};

module.exports = createCrudController;