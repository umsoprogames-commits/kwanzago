// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'wallet.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const WalletCurrencyEnum _$walletCurrencyEnum_AOA =
    const WalletCurrencyEnum._('AOA');
const WalletCurrencyEnum _$walletCurrencyEnum_unknownDefaultOpenApi =
    const WalletCurrencyEnum._('unknownDefaultOpenApi');

WalletCurrencyEnum _$walletCurrencyEnumValueOf(String name) {
  switch (name) {
    case 'AOA':
      return _$walletCurrencyEnum_AOA;
    case 'unknownDefaultOpenApi':
      return _$walletCurrencyEnum_unknownDefaultOpenApi;
    default:
      return _$walletCurrencyEnum_unknownDefaultOpenApi;
  }
}

final BuiltSet<WalletCurrencyEnum> _$walletCurrencyEnumValues =
    BuiltSet<WalletCurrencyEnum>(const <WalletCurrencyEnum>[
  _$walletCurrencyEnum_AOA,
  _$walletCurrencyEnum_unknownDefaultOpenApi,
]);

Serializer<WalletCurrencyEnum> _$walletCurrencyEnumSerializer =
    _$WalletCurrencyEnumSerializer();

class _$WalletCurrencyEnumSerializer
    implements PrimitiveSerializer<WalletCurrencyEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'AOA': 'AOA',
    'unknownDefaultOpenApi': 'unknown_default_open_api',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'AOA': 'AOA',
    'unknown_default_open_api': 'unknownDefaultOpenApi',
  };

  @override
  final Iterable<Type> types = const <Type>[WalletCurrencyEnum];
  @override
  final String wireName = 'WalletCurrencyEnum';

  @override
  Object serialize(Serializers serializers, WalletCurrencyEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  WalletCurrencyEnum deserialize(Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      WalletCurrencyEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$Wallet extends Wallet {
  @override
  final String id;
  @override
  final Money available;
  @override
  final WalletCurrencyEnum currency;

  factory _$Wallet([void Function(WalletBuilder)? updates]) =>
      (WalletBuilder()..update(updates))._build();

  _$Wallet._(
      {required this.id, required this.available, required this.currency})
      : super._();
  @override
  Wallet rebuild(void Function(WalletBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  WalletBuilder toBuilder() => WalletBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Wallet &&
        id == other.id &&
        available == other.available &&
        currency == other.currency;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, available.hashCode);
    _$hash = $jc(_$hash, currency.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'Wallet')
          ..add('id', id)
          ..add('available', available)
          ..add('currency', currency))
        .toString();
  }
}

class WalletBuilder implements Builder<Wallet, WalletBuilder> {
  _$Wallet? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  MoneyBuilder? _available;
  MoneyBuilder get available => _$this._available ??= MoneyBuilder();
  set available(MoneyBuilder? available) => _$this._available = available;

  WalletCurrencyEnum? _currency;
  WalletCurrencyEnum? get currency => _$this._currency;
  set currency(WalletCurrencyEnum? currency) => _$this._currency = currency;

  WalletBuilder() {
    Wallet._defaults(this);
  }

  WalletBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _available = $v.available.toBuilder();
      _currency = $v.currency;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Wallet other) {
    _$v = other as _$Wallet;
  }

  @override
  void update(void Function(WalletBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  Wallet build() => _build();

  _$Wallet _build() {
    _$Wallet _$result;
    try {
      _$result = _$v ??
          _$Wallet._(
            id: BuiltValueNullFieldError.checkNotNull(id, r'Wallet', 'id'),
            available: available.build(),
            currency: BuiltValueNullFieldError.checkNotNull(
                currency, r'Wallet', 'currency'),
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'available';
        available.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'Wallet', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
