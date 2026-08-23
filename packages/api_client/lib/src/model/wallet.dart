//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:api_client/src/model/money.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'wallet.g.dart';

/// Wallet
///
/// Properties:
/// * [id]
/// * [available]
/// * [currency]
@BuiltValue()
abstract class Wallet implements Built<Wallet, WalletBuilder> {
  @BuiltValueField(wireName: r'id')
  String get id;

  @BuiltValueField(wireName: r'available')
  Money get available;

  @BuiltValueField(wireName: r'currency')
  WalletCurrencyEnum get currency;
  // enum currencyEnum {  AOA,  };

  Wallet._();

  factory Wallet([void updates(WalletBuilder b)]) = _$Wallet;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(WalletBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<Wallet> get serializer => _$WalletSerializer();
}

class _$WalletSerializer implements PrimitiveSerializer<Wallet> {
  @override
  final Iterable<Type> types = const [Wallet, _$Wallet];

  @override
  final String wireName = r'Wallet';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    Wallet object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    yield r'available';
    yield serializers.serialize(
      object.available,
      specifiedType: const FullType(Money),
    );
    yield r'currency';
    yield serializers.serialize(
      object.currency,
      specifiedType: const FullType(WalletCurrencyEnum),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    Wallet object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object,
            specifiedType: specifiedType)
        .toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required WalletBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        case r'available':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(Money),
          ) as Money;
          result.available.replace(valueDes);
          break;
        case r'currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(WalletCurrencyEnum),
          ) as WalletCurrencyEnum;
          result.currency = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  Wallet deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = WalletBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

class WalletCurrencyEnum extends EnumClass {
  @BuiltValueEnumConst(wireName: r'AOA')
  static const WalletCurrencyEnum AOA = _$walletCurrencyEnum_AOA;
  @BuiltValueEnumConst(wireName: r'unknown_default_open_api', fallback: true)
  static const WalletCurrencyEnum unknownDefaultOpenApi =
      _$walletCurrencyEnum_unknownDefaultOpenApi;

  static Serializer<WalletCurrencyEnum> get serializer =>
      _$walletCurrencyEnumSerializer;

  const WalletCurrencyEnum._(String name) : super(name);

  static BuiltSet<WalletCurrencyEnum> get values => _$walletCurrencyEnumValues;
  static WalletCurrencyEnum valueOf(String name) =>
      _$walletCurrencyEnumValueOf(name);
}
