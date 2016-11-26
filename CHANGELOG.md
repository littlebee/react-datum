
## [0.9.1](https://github.com/zulily/react-datum.git/compare/0.3.1...0.9.1) (2016-11-331)


### Bugs Fixed in this Release
* [678faa5](https://github.com/zulily/react-datum.git/commit/678faa5c8ddac2999e3ecf69fac65dfcab37c0d8)  fix for SelectedModel not registering selection change + test

### New Features
* [3dc31e1](https://github.com/zulily/react-datum.git/commit/3dc31e1bd5388e0dedf18f7dee84463c11de2bef)  add support for model driven metadata via optional getDatumMetadata() model method
* [8fa8e1c](https://github.com/zulily/react-datum.git/commit/8fa8e1c83db41e1e88b257291107bad99e205017)  add support for tooltip prop on all datums
* [545dbd5](https://github.com/zulily/react-datum.git/commit/545dbd5cbe6eb64527f20fc540eed3dcd8cc24bd)  ClickToEdit form supports readonly prop for dynamic setting of form to always be readonly (no buttons)
* [6c07e98](https://github.com/zulily/react-datum.git/commit/6c07e9843dde891362845eac3894c0efe65a8bc8)  introduces ReactDatum.Percent component for display and input of percentages
* [e5f3097](https://github.com/zulily/react-datum.git/commit/e5f30976264417478ac634cf04d03bf53591d0c2)  forms now accept a modelSaveMethod prop that allows custom save methods on model to be called
* [7440d45](https://github.com/zulily/react-datum.git/commit/7440d45159f206b8c690fed2d5076660be1232e9)  form should always have form class + form should have edit class if editable
* [87d606a](https://github.com/zulily/react-datum.git/commit/87d606ad3b945909fd7b8e40a6ca5eb6efdaef21)  Add Options export for getting and setting global ReactDatum options like ReactBootstrap lib, etc.
* [4295f5f](https://github.com/zulily/react-datum.git/commit/4295f5f368b3f678cd6d078d39b0ace664e7f475)  placeholder can be anything React can render - string, component, array of components...
* [e8c6b6e](https://github.com/zulily/react-datum.git/commit/e8c6b6e10c55d98ee13854a3dfc52121c61cd341)  Number datum should abbreviate billions with B
* [4b740ec](https://github.com/zulily/react-datum.git/commit/4b740ec246b81f39e9e8b1834b21dec6e2272491)  adds ability to optionally render outer element 'asDiv'
* [0c9e038](https://github.com/zulily/react-datum.git/commit/0c9e038d2bee8c29d962e34fcb9fe1575fb5964e)  datum should accept style property and apply styles to outer span
* [690f136](https://github.com/zulily/react-datum.git/commit/690f1366dd36c287e4d8f290e346295f5dcc7a88)  added user configurable (props) debounce and debug settings to all ContextualData components

### Other Commits
* [76602a4](https://github.com/zulily/react-datum.git/commit/76602a4a490a6c15fa82728bba561032bb1de7e0) remove ellipsis props from Datum base class as they do not apply to all Datum extensions.
* [34a3f9b](https://github.com/zulily/react-datum.git/commit/34a3f9bee049b5bb829fe7466ed8d748cd0d1f1f) more api docs.  + documentor improvements
* [648876b](https://github.com/zulily/react-datum.git/commit/648876b52f1bf4d79dfe6ebe5421c32f6baeb4f7) Sync the latest updates to react-select
* [efdefa7](https://github.com/zulily/react-datum.git/commit/efdefa73b4d259d368de0005f88bc4df407bab46) remove SPAM warning of react datum percent doesn't support other formats
* [26d5ac1](https://github.com/zulily/react-datum.git/commit/26d5ac11d65252415814e36451fa90e8181b86e5) Link should respect ellipsizeAt
* [0cae246](https://github.com/zulily/react-datum.git/commit/0cae2465002ed99ad46ca469e24f93ce6d13fff4) make format: 'comma' default for numbers.
* [7a14785](https://github.com/zulily/react-datum.git/commit/7a14785ecef151ed6d3ed443193f69468085b7aa) values passed to onChange props should be consistent for all Datums. (valueOrValues, thisDatum, synthEventIfAvailable)
* [ac8175d](https://github.com/zulily/react-datum.git/commit/ac8175dd6fa2726ca5f8bad774f4c7b343a44880) Ability to reverse ellipsize in Text datum
* [d76a1c0](https://github.com/zulily/react-datum.git/commit/d76a1c0870a25b8bb3d1226723f02bb23abacc9c) Inline Edit on a placeholder should trigger the edit box

## [0.3.1](https://github.com/zulily/react-datum.git/compare/0.3.0...0.3.1) (2016-02-54)
Minor build system changes

### Other Commits
* [548f906](https://github.com/zulily/react-datum.git/commit/548f906fee367bfacb6b107f9485cc6e5d730c27) clean up package deps, update versions of bumble- libs and rebuild

## [0.3.0](https://github.com/zulily/react-datum.git/compare/0.0.0...0.3.0) (2016-02-52)
We've been working with this library here at Zulily for the last couple of months to build some cool new stuff and improving it as we go.   We have a lot more tests, documentation, new features for numbers including decimal places and abbreviated formats... Below is a subset of notable commits.

### Bugs Fixed in this Release
* [e88e163](https://github.com/zulily/react-datum.git/commit/e88e1638a1da89082e8841771ffe3bc4e2ef2a00)  fix for model value resurfacing when input is blanked
* [8995731](https://github.com/zulily/react-datum.git/commit/8995731665438a95e7150e0b102a61a590dbfc4e)  ContextualData should not append class 'undefined'
* [2f9de08](https://github.com/zulily/react-datum.git/commit/2f9de084420635dcbaada38d0ba9d41329fb53f6) :harmless: zeroFill prop type should be bool
* [06e3cc8](https://github.com/zulily/react-datum.git/commit/06e3cc8e901b8497d50d1a7a1a52c22d42dada83)  fix for failing test
* [0dbc7eb](https://github.com/zulily/react-datum.git/commit/0dbc7ebe2ea8de96b48e4427878a25c35d7ab3cd) :edit: +  fix blank image url in LazyPhoto

### New Features
* [5360ac6](https://github.com/zulily/react-datum.git/commit/5360ac65daaeda2913f7fa141cea30b4a9012c57)  adds api support for isDirty() method on all datums + tests
* [592db0d](https://github.com/zulily/react-datum.git/commit/592db0d6331adea5085f5440c1af37dc4b9458a3)  add passthrough onKeyDown for input to allow customization of keyboard handling.
* [fa7cb9e](https://github.com/zulily/react-datum.git/commit/fa7cb9e99f4a3495de17a4fbaf5068721e3264c0)  datums now support setOnBlur (default) and setOnChange props. model.set() is not called on change unless setOnChange='true'. +22 tests
* [0488d22](https://github.com/zulily/react-datum.git/commit/0488d222fc9bd3f8c92b9662555f267b4de83f36)  expose input component and current value through api. + more api methods documented
* [5fc8c10](https://github.com/zulily/react-datum.git/commit/5fc8c10b2bdf15fe096c4ecf4a8cdd72da72a8ae)  money formatter should respect user wishes and not zerofill decimal places if abbreviate is also used (again, unless the user asks otherwise)
* [d63833a](https://github.com/zulily/react-datum.git/commit/d63833a057c308de443c62772712fad0041330ee)  ContextualData components should passthrough className to element + test = 100 tests!
* [20a6eb7](https://github.com/zulily/react-datum.git/commit/20a6eb71423a6767bd3ee753dd5f0b180f9e5375)  Number datum new prop: zeroFill plus refactor/decompose format method
* [1a30010](https://github.com/zulily/react-datum.git/commit/1a30010514a5a1109a4e9c724a97f214f20be9ee)  number datum supports decimalPlaces prop for fixed decimal rounding zero filled

### Other Commits
* [775187d](https://github.com/zulily/react-datum.git/commit/775187d467df7d243b2bd06fc807c54d78aaaa82) datum should only set value on blur if there was a changed registered.  don't set on model unless user has actually made a change in the input.
