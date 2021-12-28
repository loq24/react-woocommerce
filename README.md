# :sparkles::sparkles::sparkles: React WooCommerce

## Overview

This project is the version 2 of my original [React eCommerce template](https://github.com/loq24/react-ecommerce). This version implements ISR or the Incremental Static Regeneration mode of NextJS framework. Instead of using built in REST API support, this project implements GraphQL via Apollo Client and WPGraphQL and WooGraphQL in the Wordpress Headless CMS backend. WooGraphQL exposes WooCommerce data via GraphQL.

The design system is powered by Tailwind CSS.

You can check the demo [here](https://react-woocommerce.vercel.app/)!

## Basic Setup

You should have a basic knowledge of NextJS framework and Wordpress in order to set up this project.

### Backend

- Install Wordpress as our Headless CMS
- Install **WooCommerce** plugin
- Install **WP GraphQL** plugin
- Install **WPGraphQL CORS** plugin
- Install **WPGraphQL WooCommerce (WooGraphQL)** plugin
- If you want to have WooCommerce sample data you can export their provided sample CSV [here](https://woocommerce.com/document/importing-woocommerce-sample-data/)

### Frontend

```bash
git clone https://github.com/loq24/react-woocommerce
cd react-woocommerce
yarn install
yarn dev
```

Make sure that you update the **.env** file with your own WP url backend. Then open http://localhost:3000/

## Copyright and license

MIT
