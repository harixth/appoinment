# Appointment

Production url: https://appoinment.now.sh/

## Getting started

This app allow user to make appointment based on predefined slots based on the requirement given.

A weekly slot can be generate by visiting `/admin` but will only satisfy current requirement, so the mutation named `addAvailableWeekReservation` need change is requred if there is a need for change.

### Setup in local development

Install it and run:

```bash
git clone {repoURL}
cd {projectName}
npm install
npm run dev
# or
yarn
yarn dev
```

#### TODO

- Use nice custom font
- Number Phone Validation
- Cancel Booking
- Add unit testing with Jest & Enzyme
- Add React Helmet for custom header in component
- Add GraphQL subscription for real time


