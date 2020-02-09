/**
 * Function to make crud automatcly
 * @path A url path => ex: (/users)
 * @router Param of express.js
 * @model A mongoose Model
 */
async function crud(path, router, model) {
  const Create = async (req, res) => {
    const data = req.body;

    if (data) {
      try {
        const Entity = new model(data);
        await Entity.save();
        return res.status(201).send({ msg: `created item in ${path}`, data });
      } catch (err) {
        return res.status(500).send({ msg: `internal server error => ${err}` });
      }
    } else {
      return res
        .status(400)
        .send({ msg: `you need send an a body in ${path}` });
    }
  };
  const Read = async (req, res) => {
    const { id } = req.params;

    if (id) {
      try {
        const Entity = await model.findOne({ _id: id });

        if (Entity) {
          return res.status(200).send(Entity);
        } else {
          return res
            .status(200)
            .send({ msg: `could not find item ${id} in ${path}` });
        }
      } catch (err) {
        return res.status(500).send({ msg: `internal server error => ${err}` });
      }
    } else {
      const Entity = await model.find({}).sort("-createdAt");

      return res.status(200).send(Entity);
    }
  };
  const Update = async (req, res) => {
    const { id } = req.params;

    if (id)
      return res.status(200).send({ msg: `updated item ${id} in ${path}` });
    return res.status(400).send({ msg: `you need send an id param ${path}` });
  };
  const Delete = async (req, res) => {
    const { id } = req.params;

    if (id) {
      try {
        const Entity = await model.findByIdAndDelete({ _id: id });

        if (Entity) {
          return res.status(200).send({ msg: `deleted item ${id} in ${path}` });
        } else {
          return res
            .status(200)
            .send({ msg: `could not find item ${id} in ${path}` });
        }
      } catch (err) {
        return res.status(500).send({ msg: `internal server error => ${err}` });
      }
    } else {
      return res.status(400).send({ msg: `you need send an id param ${path}` });
    }
  };

  router.post(path, Create);
  router.post(`${path}/:id`, Create);

  router.get(path, Read);
  router.get(`${path}/:id`, Read);

  router.put(path, Update);
  router.put(`${path}/:id`, Update);

  router.delete(path, Delete);
  router.delete(`${path}/:id`, Delete);
}

module.exports = crud;
