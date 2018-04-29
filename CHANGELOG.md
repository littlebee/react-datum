
## [1.0.0-beta1.1](https://github.com/zulily/react-datum.git/compare/0.14.6...1.0.0-beta1.1) (2018-04-25)


### Bugs Fixed in this Release
* [ee1d903](https://github.com/zulily/react-datum.git/commit/ee1d9038be2af53316c6e8e9c797643d2ba37720)  stateless support should allow null values to be set
* [be6feab](https://github.com/zulily/react-datum.git/commit/be6feabcb61c950c634bcaf9948dd98b589c1c70)  (unreleased) collection picker should not assume value in state
* [c3de249](https://github.com/zulily/react-datum.git/commit/c3de2492a740540e218e1130286f45171c9873d8)  LazyPhoto should reset it's notFound state on model value / prop changes
* [0b290b8](https://github.com/zulily/react-datum.git/commit/0b290b8e292a48496b267a14c3f79511dffbf350)  fixes long standing issue where when ever you search for a new thing it would wipe the previous selected things.   NO MORE!
* [85fa364](https://github.com/zulily/react-datum.git/commit/85fa364dc894cb8a0f144329cae3790ad3b3616f)  datums should allow zero entry
* [37649df](https://github.com/zulily/react-datum.git/commit/37649dfe795ba99ca7ad2bedc385565d962fb497)  collection picker when handling async lookups, should trigger sync on the datum model when collection model syncs

### New Features
* [e79a506](https://github.com/zulily/react-datum.git/commit/e79a506122bcf6190ddf68f6423e74cdb00d57d8)  adds extendable method to get value from input component
* [cccae00](https://github.com/zulily/react-datum.git/commit/cccae003ca0182fab77e4e3adbcb74832a9f05dd)  add support for stateless prop on all datums to support fully controlled components
* [36e3155](https://github.com/zulily/react-datum.git/commit/36e3155e258954610d4c07b1bfee65779feb337e)  CollectionPicker: add support for CSV model values
* [f636c96](https://github.com/zulily/react-datum.git/commit/f636c960fbd6b2ff4af9ff989d22dde7d93d219d)  collection picker should be able to display multiple values even when input is multi:false
* [14b146e](https://github.com/zulily/react-datum.git/commit/14b146e426051e72968563a1da180fac030c1320)  add csvDisplay prop to CollectionPicker.

### Other Commits
* [6ff63a3](https://github.com/zulily/react-datum.git/commit/6ff63a33ec07a34daf8085fe0c1409943ce1cea2) add script to reliably build and publish gh-pages (stolen from react-datum-datagrid)
* [6943cca](https://github.com/zulily/react-datum.git/commit/6943cca599150ffcd0d36353231e435282e41de8) add guard against state.errors not being set
* [6e6e04a](https://github.com/zulily/react-datum.git/commit/6e6e04aef745b6bf35cb790493d60aebc5b27578) fix version of babel-preset-env to 1.6.1
* [29215de](https://github.com/zulily/react-datum.git/commit/29215ded97bcdaed16c18684d73861beb8f525f5) react-datum now runs on react 16. all tests passing, all examples working
* [e62b8b9](https://github.com/zulily/react-datum.git/commit/e62b8b9d5be6c00f1c902716907fb8173f1bdc45) lib folder must not be gitignored if intending to support npm package.json git reference
* [8b1bb7d](https://github.com/zulily/react-datum.git/commit/8b1bb7d34659a88aedf3cafd0d0a2e563cb915c6) clean out docVendorLibs on each docs build
* [bb386f9](https://github.com/zulily/react-datum.git/commit/bb386f935a226e267ad7e338343bf8a53b84ebbc) use more compat form for exports from Rd
* [24015ba](https://github.com/zulily/react-datum.git/commit/24015ba7d7e116d0f37f7f8935649fc43ff3efc2) back to the webpack way
* [ff2bd60](https://github.com/zulily/react-datum.git/commit/ff2bd60ea044597eb7aa34aa048f522c359046c9) don't use export keyword in index.js if we are running on node'
* [b402377](https://github.com/zulily/react-datum.git/commit/b4023772d198f1bc1dae6c9ebe3f8170bdd90994) add dist folder back to git
* [154aa4d](https://github.com/zulily/react-datum.git/commit/154aa4db8e8df4a7308c4039b3351505c1f37897) cleanup dependencies, stop publishing extra copies of stuff from dev dependencies
* [6bc80ad](https://github.com/zulily/react-datum.git/commit/6bc80ade0fed5b078e9eeca0d3107855f3a0afe1) fix typo in form example
* [f7231c8](https://github.com/zulily/react-datum.git/commit/f7231c8245cf50b0e62cfd75a26c2d634f3358bf) merge from master
* [7184d8c](https://github.com/zulily/react-datum.git/commit/7184d8ce45cfe686e2689a65596424af62f6f358) fix git pull command in grunt gh-pages task
* [3188514](https://github.com/zulily/react-datum.git/commit/3188514863dc104d65eb020aa838a3b03113bd7e) fix messaging when trying to grunt gh-pages from branch other than master
* [b9662fd](https://github.com/zulily/react-datum.git/commit/b9662fd6d483253e751cf28242b3317d650f9033) WIP: add grunt task to update gh-pages
* [dfed816](https://github.com/zulily/react-datum.git/commit/dfed8167ff7d40fc1b3cd439ff1de9fa26bf4d5d) remove unused happypack module
* [5accf11](https://github.com/zulily/react-datum.git/commit/5accf118cbae20e7a9efd1f3c075445dbcd4c288) remove docs dir from master branch and add to gitignore and npmignore
* [b5d96f4](https://github.com/zulily/react-datum.git/commit/b5d96f46d84e77f168e42e9ca5b0bddd884581d8) update bumble-docs to 0.7.0 to eliminate extra vendor libs shipping with package
* [8d25df0](https://github.com/zulily/react-datum.git/commit/8d25df091bea69eb8f9842731be3715052d67733) port examples to ES6 + React 16 - all examples working with and all but two tests passing
* [601bec7](https://github.com/zulily/react-datum.git/commit/601bec72b77d559e3e50c38150f2ec0820691d95) copy docs/vendor libs from node_modules on build instead of statically adding and updating them
* [8979e07](https://github.com/zulily/react-datum.git/commit/8979e07964b96fc8d34538ab7702a55ba0e4383b) upgrade to latest bumble-docs for react 16 support
* [b9188ce](https://github.com/zulily/react-datum.git/commit/b9188ce9bc32fa5d0a3e5410dac3e7ff03989fe1) fix test failing because test component was a functional component that no longer support regs
* [3b90a1c](https://github.com/zulily/react-datum.git/commit/3b90a1c7c45ee62ee5b3c0c817de257d015e72ce) fix failing test due to new react attribute rendering
* [c498205](https://github.com/zulily/react-datum.git/commit/c498205973f09604b5841a156121aa629f56b972) fix warning about hideProtocol not a supported DOM attribute
* [8beb435](https://github.com/zulily/react-datum.git/commit/8beb4357ede62dd56a78de0081ef4d5c24f31506) update all coffee-react and coffee-react-transform usages to at least 4.0.0 to fix issue with code generating React.__spread
* [f0fe0ce](https://github.com/zulily/react-datum.git/commit/f0fe0ceae139d130874b62febdefca9080c29a42) WIP upgrade to React 16; new react-select; spreads in CJSX are failing. thinking about replacing or upgrading coffeescript
* [0da4c85](https://github.com/zulily/react-datum.git/commit/0da4c85d20d044cbec34ab86c115d40e83d9d357) remove unused happypack module
* [d29c75e](https://github.com/zulily/react-datum.git/commit/d29c75e8842db600f261ba679133f7ec613d90d7) update build system to webpack 3.4.1
* [d42b883](https://github.com/zulily/react-datum.git/commit/d42b883fd8b8fe1fa96aea274f84c3cd197d2e76) reverted package.json to point to zulily.react-select
* [af85642](https://github.com/zulily/react-datum.git/commit/af856422b479aec9db88aace3b1e624ec7e013dd) Revert 'Revert 'fix validators on numbers to handle numeric values in addition to string''
* [4ea3447](https://github.com/zulily/react-datum.git/commit/4ea34472b8b2bc31a34b0bbd373b1322be7109fd) Revert 'fix validators on numbers to handle numeric values in addition to string'
* [621b062](https://github.com/zulily/react-datum.git/commit/621b0628814739474a632c70a3ea43cf5f31b441) added my react-select to dependencies
* [dc29c63](https://github.com/zulily/react-datum.git/commit/dc29c63f62b1d6ff5821b40506f2167e5e197c23) fix validators on numbers to handle numeric values in addition to string
* [3e046bb](https://github.com/zulily/react-datum.git/commit/3e046bb5e6f7d3efce1407ffee33d28b0ae6bb23) Merge pull request #8 from kamsci/kc/numberDatum/getValueAsNumber
* [3259012](https://github.com/zulily/react-datum.git/commit/3259012625a3202e949e87abb6eb68cb298debc4) Return value as number when in Number or WholeNumber datum
* [578ad4d](https://github.com/zulily/react-datum.git/commit/578ad4d37348ebfb8a909bb24b788172959ef767) revert change to more accurately tell when the model value has changed. fixes regress on curation filters
* [f98328c](https://github.com/zulily/react-datum.git/commit/f98328c77f21949c9031030b99c6edf4a097e8d7) collection picker should display raw model value when can't find model for id in collection
* [d2ff258](https://github.com/zulily/react-datum.git/commit/d2ff258bd9cc780dcfa2eebe738d74fe95dba209) revert earlier change to more aggressively watch for model value changes
* [499a139](https://github.com/zulily/react-datum.git/commit/499a1399ef195eb59db4a9b8c6395903f6efc662) CollectionPicker should rerender on first model sync after collection.get for datums not wrapped in <Model> context
* [4345175](https://github.com/zulily/react-datum.git/commit/4345175d0f2596c393eabadc5227d328268193c5) CollectionPicker: defer triggering invalidate on first model sync. fixes issue when used in react-datagrid
* [2e99f25](https://github.com/zulily/react-datum.git/commit/2e99f251f92219250ed8ef46e90cf0abbe72d316) fixes issue where datum doesn't pick up new model changes when in input mode
* [3199278](https://github.com/zulily/react-datum.git/commit/3199278046149f0d6fcf2350553822664abe6d91) add ref to higher order function that renders the react-select component
* [5e70960](https://github.com/zulily/react-datum.git/commit/5e70960ae112fecb8279f5664d7200d15506ff5d) only remove initial selectOptions.options if props.asyncSuggestionCallback
* [a517997](https://github.com/zulily/react-datum.git/commit/a517997dc2a9e897e8d405e24f9e3bc87324d7cc) fix for unreleased regression. commit 1ebc8a49c1e9e140974e338eefc1a4ebfab5b1e8
* [3d5d8bb](https://github.com/zulily/react-datum.git/commit/3d5d8bb06a46b63c30d2498927fd6eee18a3f07d) don't throw an error when collection picker isn't given a collection prop
* [7b14d3f](https://github.com/zulily/react-datum.git/commit/7b14d3fc196fb5d39f4987d338d3fef3a7329ca3) collection picker should not pass options array to react-select if not loading synchonously.  Passing an options array causes react-select to present all options and not go through the async callback to get the full option list when you clear the input
* [1ebc8a4](https://github.com/zulily/react-datum.git/commit/1ebc8a49c1e9e140974e338eefc1a4ebfab5b1e8) props.asyncSuggestionCallback should have precedence over collection filter for picker

## [1.0.0-beta1.2](https://github.com/zulily/react-datum.git/compare/0.14.6...1.0.0-beta1.2) (2018-04-26)


### Other Commits
* [db939e0](https://github.com/zulily/react-datum.git/commit/db939e05d8729c559d22b4a1fa2ff7fb6f87789e) fix for issue when focusing the collectionPicker

## [1.0.0-beta1.3](https://github.com/zulily/react-datum.git/compare/0.14.6...1.0.0-beta1.3) (2018-04-29)


### Other Commits
* [715bb8c](https://github.com/zulily/react-datum.git/commit/715bb8c2d8bfea58af88be2038fae233f81ffff9) new build with update to bundled react-select to pass through the full values array to the value component

## [0.14.6](https://github.com/zulily/react-datum.git/compare/0.14.5...0.14.6) (2017-07-16)


### Bugs Fixed in this Release
* [a169b08](https://github.com/zulily/react-datum.git/commit/a169b081c93045c4ab769bb805de4e7c57ffdbfa)  should not stack when collection picker collection model is missing display value. + move react deps to dev

## [0.14.5](https://github.com/zulily/react-datum.git/compare/0.14.4...0.14.5) (2017-07-13)


### Other Commits
* [59d5442](https://github.com/zulily/react-datum.git/commit/59d544268436307dd1cf545027258b4daafe55f6) fix regression bug in last commmit. LazyPhoto should call super on componentWillMount

## [0.14.4](https://github.com/zulily/react-datum.git/compare/0.14.3...0.14.4) (2017-07-13)


### Bugs Fixed in this Release
* [f726368](https://github.com/zulily/react-datum.git/commit/f7263689d04708ad44b970a62c52290adc435924)  fix LazyPhoto sporatically fails to load image in React 16.

### Other Commits
* [94d3812](https://github.com/zulily/react-datum.git/commit/94d3812ef6d92842b72f25b313ce613776e8940c) upgrade peer dependencies to reflect current known working peer versions

## [0.14.3](https://github.com/zulily/react-datum.git/compare/0.14.2...0.14.3) (2017-07-12)


### Other Commits
* [4088b88](https://github.com/zulily/react-datum.git/commit/4088b8822277ac70c946ed806ba4b5a8bc7cbc35) use proper es export syntax :/ so webpack doesnt get confused and add each component class to the global space

## [0.14.2](https://github.com/zulily/react-datum.git/compare/0.14.1...0.14.2) (2017-06-18)


### Other Commits
* [6ab030e](https://github.com/zulily/react-datum.git/commit/6ab030e8aa4ddca66dca9e27670fb16c19d65951) upgrade selectable-collection to 0.3.1

## [0.14.1](https://github.com/zulily/react-datum.git/compare/0.14.0...0.14.1) (2017-06-18)


### Other Commits
* [47d0113](https://github.com/zulily/react-datum.git/commit/47d0113a94175d494b8fdfd2415035b0294669da) add .npmignore

## [0.14.0](https://github.com/zulily/react-datum.git/compare/0.13.1...0.14.0) (2017-06-18)
In addition to the few new features, this version of react-datum includes better support for UMD and commonjs usage without any additional transpile required!

### New Features
* [5a794a0](https://github.com/zulily/react-datum.git/commit/5a794a053af9efdfa3fdea0252f9b639d3686de2)  add displayModelValue prop to CollectionPicker

### Other Commits
* [afa43e6](https://github.com/zulily/react-datum.git/commit/afa43e6d2f81a55be7a44691d2b7d4907ec5a04b) Merge pull request #4 from jkarlovich/feature/linkUpdate
* [aa45b2c](https://github.com/zulily/react-datum.git/commit/aa45b2c40a4debd231b9ae5e4fc022b2e271481e) made an option to hide the protocol in the link datum by passing a prop of true to hideProtocol, wrote a test to test it
* [89eba68](https://github.com/zulily/react-datum.git/commit/89eba680389c745b4c5fc69bee5fbf8652a032f1) changed hideProtocol as a prop

## [0.13.1](https://github.com/zulily/react-datum.git/compare/0.13.0...0.13.1) (2017-04-15)
Minor feature improvements and bug fixes.

### New Features
* [4509edf](https://github.com/zulily/react-datum.git/commit/4509edfd0903c85accec30ef3c402eaef8de780c)  add clearErrors() API call to manually reset the error state of any datum
* [2b72f35](https://github.com/zulily/react-datum.git/commit/2b72f35cd9e2fc2325ad15b6ff8ee62a032a41d3)  add support for extensions dynamically determining the attribute for like an international price datum that dynamically selects an attribute based on the localcurrency

### Other Commits
* [d442f95](https://github.com/zulily/react-datum.git/commit/d442f95e7b85d9d5c00ba8a0712d0c728769e309) Added preliminary check to clearErrors method which is much more performant.
* [02469aa](https://github.com/zulily/react-datum.git/commit/02469aaccce6a4b0d419fe3de152a0b63ed4007e) collection picker when multiselect should retain selectios as the user searches and adds more
* [a13ae1e](https://github.com/zulily/react-datum.git/commit/a13ae1e1055c6f87f9b9c5135339de5a6a121f27) add support for specifying the rbOverlayProps as a prop to all Datum extensions
* [a675d90](https://github.com/zulily/react-datum.git/commit/a675d9043546cfb2163a2731262f65c726e93a2c) default validation of Number value - must be numerical + onModelSaveError handler should not show 'Error: undefined' when resp is a string
* [8570510](https://github.com/zulily/react-datum.git/commit/857051057093dc29b9402709eb658aafc3b1a95b) Update to the latest zulily react-select lib
* [a44b9b8](https://github.com/zulily/react-datum.git/commit/a44b9b8c5a52fe2c90253d18eb7d213d212c2586) CollectionPicker: add guard for null or undefined displayAttr value when grouping suggestion models

## [0.13.0](https://github.com/zulily/react-datum.git/compare/0.12.1...0.13.0) (2017-02-20)
No new features added, but lot's of tests added to fill in coverage.  

## [0.12.1](https://github.com/zulily/react-datum.git/compare/0.12.0...0.12.1) (2017-01-29)


### Bugs Fixed in this Release
* [0c0d570](https://github.com/zulily/react-datum.git/commit/0c0d5709a24a540425797fb6fea9f157c88b15ca)  tests for negative values Number

### Other Commits
* [8ab1285](https://github.com/zulily/react-datum.git/commit/8ab128577a12a9c65b8d46c67c234ebe543c505a) fix failing test (merge)
* [f4a0872](https://github.com/zulily/react-datum.git/commit/f4a087298f55e325e04b0489227065907a068401) fix failing test
* [e504c82](https://github.com/zulily/react-datum.git/commit/e504c828807f9db65c0b0f037807693dd2c40441) documentation correction for Link datum
* [634b6ac](https://github.com/zulily/react-datum.git/commit/634b6aceb30f31911b1617a819f346fff4ba1ad3) datum.md validations should come before metadata which is anticipated to be used less often

## [0.12.0](https://github.com/zulily/react-datum.git/compare/0.11.0...0.12.0) (2017-01-25)


### New Features
* [018380b](https://github.com/zulily/react-datum.git/commit/018380b726450724a911037232b83f1432753218)  LazyPhoto now alows setting LazyPhoto.notFoundUrl and LazyPhoto.loadingUrl through ReactDatum.Options.set()
* [20c39b5](https://github.com/zulily/react-datum.git/commit/20c39b5150c7a069d48ca13139bb31456eef1848)  if model attribute value for a Number datum is given as string, strip dollar signs and commas

## [0.11.0](https://github.com/zulily/react-datum.git/compare/0.10.0...0.11.0) (2017-01-17)
A big new featue is the ability to specify a 'value' prop to all Datum extensions.  Using the value prop enables Datums to be easily used without an associated Backbone model.

### Bugs Fixed in this Release
* [5ddd3bc](https://github.com/zulily/react-datum.git/commit/5ddd3bc24a9a3c9efaca41a7a1d87dc2fab38734)  fixed - collection picker click clear icon should set model value to null. +test
* [6379ca7](https://github.com/zulily/react-datum.git/commit/6379ca7c40111825aedad1d65640ead124a6deca)  Number datum should gracefully handle non-numeric model values. +tests

### New Features
* [4093d11](https://github.com/zulily/react-datum.git/commit/4093d113652b0d5dba639903528fd5ea185811a1)  allow react bootstrap overlay props to be modified via extension
* [0e0f2e7](https://github.com/zulily/react-datum.git/commit/0e0f2e7926865a3957d581297e11224e511e2167)  add css class to datum to indicate save status. One of 'saving', 'saved', 'not saved'.  Only applies if saveOnSet==true
* [9781eed](https://github.com/zulily/react-datum.git/commit/9781eed88a7fc3eee8e7d9ce8ca49a21bc24ca02)  modelSaveOptions - new prop for all datums to allow you to specified options passed as second arg to model save method.

### Other Commits
* [1f39e6a](https://github.com/zulily/react-datum.git/commit/1f39e6a3779f5238f0dc33fb0371c8dcbfb5f023) Text datum should better handle non text model value types.  simple arrays & booleans tested.
* [af42198](https://github.com/zulily/react-datum.git/commit/af421983ef215b94404e9732931d56a0b63b7dd0) errors from saving should show resp.responseText or resp.statusText
* [1bd184d](https://github.com/zulily/react-datum.git/commit/1bd184dc566c07ca6a44476af760007ecdff2aa0) allow Model and Collection components to accept js objs

## [0.10.0](https://github.com/zulily/react-datum.git/compare/0.9.2...0.10.0) (2016-12-16)


### Bugs Fixed in this Release
* [6513f82](https://github.com/zulily/react-datum.git/commit/6513f8241f54ab4968ffd5aceeb16cc5abe37c8e)  fix for issues in collection picker when one of either filterForPicker or asyncSuggestionCallback is debounced

### New Features

The Big new feature in version 0.10.0 is inputMode={'inlineEdit'}.  Thank you @bkuraku for that feature.   We also added better support for informational help tooltips on labels and better support (optional) for react-bootstrap.  

* [971ae12](https://github.com/zulily/react-datum.git/commit/971ae124e994f6a3e1b2c36e0bbd53684c200130)  add new props, saveOnSet to save model whenever datum sets model value; and modelSaveMethod which allows changing the method called to save the model to 'patch' for example.
* [58d23d6](https://github.com/zulily/react-datum.git/commit/58d23d6df4d93187a3bb65a9fb63e1980b465c48)  inline edit datum should go back to display mode on click outside or escape key.
* [f94d6c6](https://github.com/zulily/react-datum.git/commit/f94d6c615571527916ea8ba768284126cd2345b8)  add cursor:help to outer element if tooltip provided

### Other Commits
* [3efcc4d](https://github.com/zulily/react-datum.git/commit/3efcc4d57b2502e7bbf37d61f747d94aafd42eeb) add tests for inline edit mode
* [901ba45](https://github.com/zulily/react-datum.git/commit/901ba456a3afe5614fa472a6390e08c3355862b6) datum should focus when after going into inline edit mode
* [b2b0bff](https://github.com/zulily/react-datum.git/commit/b2b0bff4c6806f442b33f087a917f92ed6e4859f) refactor / cleanup + add tests for inline editing feature
* [0b1110e](https://github.com/zulily/react-datum.git/commit/0b1110e5040a194244d82aed4509c6909ced9c36) when using value prop without model as inputMode edit, user updates should not be reset back to the value prop
* [4c77e3d](https://github.com/zulily/react-datum.git/commit/4c77e3d2436e1fc094b0f43991d09ae6eab3fc4c) remove typo in collectionPicker
* [ac65a31](https://github.com/zulily/react-datum.git/commit/ac65a3188daedb68a3285fb03c7a107fb9f1a93f) doc updates
* [60afeee](https://github.com/zulily/react-datum.git/commit/60afeee3689c99e49851fa24cbc02a4405fb3fca) Ability to use Select for synchronous collection pickers and some bug fixes
* [fc1ae6a](https://github.com/zulily/react-datum.git/commit/fc1ae6aa33dd0f3a9ad8b7c64af873d39d4f58a5) doc updates
* [4a3071a](https://github.com/zulily/react-datum.git/commit/4a3071a027b239daae287c36c44be06660da59a3) should not render the metadata label if prop provided for label is null
* [c2e4c71](https://github.com/zulily/react-datum.git/commit/c2e4c7110059d3336126579b7aa1d8b700967696) Label should pass through styling to label element
* [400ff6b](https://github.com/zulily/react-datum.git/commit/400ff6b72976e17829d0c09ad5cdb82464e53ce7) add support for model-less datums via new value prop.  add new Label datum.
* [af36c25](https://github.com/zulily/react-datum.git/commit/af36c25b2a992760274bf58f27bac02394942d58) label tooltip should use ReactBootstrap if provided
* [68f6615](https://github.com/zulily/react-datum.git/commit/68f66150c39256103bb3496daa80fe661c5e12f1) use more common '(greater|less) than or equal to' for number validation errors
* [c3a9e1a](https://github.com/zulily/react-datum.git/commit/c3a9e1a1b625a62afad6125599bf7419e3ab9fc4) error icon popover should use ReactBootstrap if provided
* [cd3521b](https://github.com/zulily/react-datum.git/commit/cd3521b537b19802c221c7ca3abc53aafa7f3fe6) add RbOverlayProps to configurable Rd options
* [d59aa37](https://github.com/zulily/react-datum.git/commit/d59aa37223bebdcb3138e3929549067427f35136) updates tool tip (html title attr) placement to only be on labels. you just have a label.
* [5b5ab69](https://github.com/zulily/react-datum.git/commit/5b5ab6991c90a12a2e1e1dc9013d7b9eba55522d) clean build. docs build

## [0.9.2](https://github.com/zulily/react-datum.git/compare/0.9.1...0.9.2) (2016-11-331)


### Bugs Fixed in this Release
* [525e35b](https://github.com/zulily/react-datum.git/commit/525e35b0b128d95f33c36b962362e248b7773451)  should definitely not render 'false' title attributes

## [0.9.1](https://github.com/zulily/react-datum.git/compare/0.3.1...0.9.1) (2016-11-26)


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

## [0.3.1](https://github.com/zulily/react-datum.git/compare/0.3.0...0.3.1) (2016-02-23)
Minor build system changes

### Other Commits
* [548f906](https://github.com/zulily/react-datum.git/commit/548f906fee367bfacb6b107f9485cc6e5d730c27) clean up package deps, update versions of bumble- libs and rebuild

## [0.3.0](https://github.com/zulily/react-datum.git/compare/0.0.0...0.3.0) (2016-02-21)
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
