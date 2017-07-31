var Q = require('q');


export class Promise {
    constructor (params) {
        this.params = params || {};
        this.method = "GET";
        this.expect = "TEXT";
        this.data = null
        this.start();
    }
    /**
     * Write attribute for class
     **/
    start() {
        for (let [k, v] of Object.entries(this.params)){
            this[k] = v
        }
    }
    data_expect(data){
        if (data){
            switch (this.expect){
                case "TEXT":
                    data = data.text();
                    break;
                case "JSON":
                    data = data.json();
                    break;
                case "BLOB":
                    data = data.blob();
                    break;
                case "FORM":
                    data = data.formData();
                    break;
                case "ARRAY":
                    data = data.arrayBuffer();
                    break;
            }
            return data
        }
        return false
    }
    promise(){
        let self = this, params_fetch = {
            method: this.method,
            cache: 'default',
            body: this.data
        }
        return Q.fcall(function () {
            return fetch(self.url, params_fetch).then(res => {
                return self.data_expect(res);
            }).then(res => {
                return res
            }).catch(error => {
                throw error
            })
        });
    }
}