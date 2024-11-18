## RNAproDB frontend setup

Note: we recommend running RNAproDB at [https://rohslab.usc.edu/rnaprodb/](https://rohslab.usc.edu/rnaprodb/). This repository is provided for users to explore our implementation. Please note that the backend repository is separate and can be found here: [https://github.com/timkartar/RNAproDB](https://github.com/timkartar/RNAproDB).

1. Ensure Apache server is set up and running: [https://httpd.apache.org/](https://httpd.apache.org/)
2. Download Node.js and npm: [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
3. Refer to example Apache configuration in example_apache_configuration.txt
4. In the main folder:
5. `git checkout apache-server`
6. `npm install .`
7. `npm run build`
8. Optional: Install django [https://docs.djangoproject.com/en/5.1/topics/install/](https://docs.djangoproject.com/en/5.1/topics/install/) to integrate backend and frontend (please ensure backend is set up)
9. Restart apache (`sudo systemctl restart apache2`)
