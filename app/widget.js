import React, { Component } from 'react';
import { Pp } from './Base.js'
import U from 'react-addons-update';

class FieldChar extends Component {
    constructor(props){
        super(props);
        // this.kind = new Set();
        // this.kind.add("default").add("help").add("sizing");
        // this.get_kind = this.get_kind.bind(this);
    }
    // get_kind(){
    //     var field = this.props.field;
    //     var html = <div></div>;
    //     if (this) {
    //         html =<div className="form-group">
    //             <label className="control-label col-sm-2" for={field.name}>{field.label}</label>
    //             <div className="col-sm-10">
    //                 <input type={field.name} className="form-control" id={field.name} placeholder={field.placeholder}/>
    //             </div>
    //         </div>
    //     }else if(this){
    //         html = <div className="form-group">
    //             <div className="col-xs-4">
    //                 <label for={field.name}>{field.label}</label>
    //                 <input className="form-control" id={field.name} type={field.name} placeholder={field.placeholder} />
    //             </div>
    //         </div>
    //     }else if(this) {
    //         html = <div className="form-group">
    //             <label for={field.name}>{field.label}</label>
    //             <input type={field.name} className="form-control" id={field.name} placeholder={field.placeholder}/>
    //             <span className="help-block">This is some help text...</span>
    //         </div>
    //     }
    // }
    render() {
        var field = this.props.field;
        return (
            <div className="form-group">
                <div className="col-xs-6">
                    <label for={field.name}>{field.label}</label>
                    <input className="form-control" id={field.name} type={field.name} placeholder={field.placeholder} />
                </div>
            </div>
        )
    }
}
class TextArea extends React.Component {
    render() {
        var field = this.props.field;
        return (
            <div className="form-group">
                <label for={field.name}>{field.label}</label>
                <textarea className="form-control" rows="5" id={field.name} placeholder={field.placeholder}></textarea>
            </div>
        )
    }
}
class Selection extends React.Component {
    render() {
        var field = this.props.field;
        return (
            <div></div>
        )
    }
}

class FormView extends React.Component {
    constructor(props) {
        super(props);
        this.field = {name: {label: "Name", type: "input", name: "name", placeholder: "Name..."},
                      age: {label: "Age", type: "int", name: "age", placeholder: "Age..."},
                      password: {label: "Password", type: "password", name: "password", placeholder: "Password..."},
                      email: {label: "Email", type: "email",    name: "email", placeholder: "Email..."},
                      note: {label: "Note", type: "text", name: "note", placeholder: "Note..."}}
        this.render_field = this.render_field.bind(this);
    }
    render_field(field){
        var html = <div></div>;
        var input = new Set();
        var select = new Set();
        var text = new Set();
        input.add("input").add("password").add("integer").add("inter").add("email");
        select.add("selection").add("select");
        text.add("text").add("textarea");
        if (input.has(field.type)){
            html = <FieldChar field={field} />
        }else if (select.has(field.type)){
            html = <Selection field={field} />
        }else if (text.has(field.type)){
            html = <TextArea field={field} />
        }
        return html
    }
    render() {
        return (
            <div ref= {(form) => this.form = form} className="app-view-form form-horizontal container">
                {Object.keys(this.field).map((k) => this.render_field(this.field[k]))}
            </div>
        )
    }
}

class TreeView extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div ref= {(tree) => this.$el = tree} className="app-view-tree">
                <table>
                    <TreeHead app={this.app} />
                    <TreeBody app={this.app} />
                    <TreeFoot app={this.app} />
                </table>
            </div>
        )
    }
}

class TreeHead extends Component {
    constructor(props){
        super(props)
        this.data = {id: "ID", name: "Name", age: "Age", country: "Country"}
    }
    render() {
        return (
            <thead>
                <TreeRow item={this.data} app={this.app} isHeader={true} />
            </thead>
        )
    }
}

class TreeBody extends Component {
    constructor(props){
        super(props)
        this.data = [{id: 1, name: "ABC", age: 23, country: "Việt Nam"},
                     {id: 2, name: "DEF", age: 32, country: "Việt Nam"}]
    }
    render() {
        return (
            <tbody>
                {this.data.map((item) => <TreeRow key={item.id} app={this.app} item={item} />)}
            </tbody>
        )
    }
}

class TreeRow extends Component {
    constructor(props){
        super(props)
    }
    onClickItem() {
        this.app.App.changeState(U(this.app.App.state, {active_id: this.data.id}));
        this.app.Application.change_view_manager("form")
        // do something
    }
    __onBeforeRender(){
        // this.isHeader = this.props.hasOwnProperty("isHeader") ? true : false;
        this.data = this.props.item;
    }
    render() {
        return (
            <tr ref={(row) => this.$el = row} onClick={this.onClickItem.bind(this)}>
                <th><input type="checkbox" /></th>
                {Object.keys(this.data).map((k) => <td key={k}>{this.data[k]}</td>)}
            </tr>
        )
    }
}

class TreeFoot extends React.Component {
    render() {
        return (
            <tfoot>

            </tfoot>
        )
    }
}

module.exports = {TreeView: Pp(TreeView), FormView: Pp(FormView), TreeBody: Pp(TreeBody), TreeFoot: Pp(TreeFoot),
    TreeHead: Pp(TreeHead), TreeRow: Pp(TreeRow)}