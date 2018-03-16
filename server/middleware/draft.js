Business.findOne({ where: { businessName } }).then((found) => {
    if (found && found.businessName === businessName) {
      return res.status(409).send({ message: `Business with business name: ${businessName}, already exist in your catatlog` });
    }
}).catch(error => res.status(400).send(error));