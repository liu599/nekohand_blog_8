import model from '@symph/joy/model';
import dynamic from "@symph/joy/dynamic";
// import utils from '../utils';
import React from "react";

@model()

export default class AppModel {
    namespace = 'nekoblog';
    initState = {
        status: {},
        user: '',
        ip: '',
        token: '',
        loading: false,
    };
}