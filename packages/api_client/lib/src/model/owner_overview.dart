//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:api_client/src/model/money.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'owner_overview.g.dart';

/// OwnerOverview
///
/// Properties:
/// * [verifiedRevenue]
/// * [pending]
/// * [available]
/// * [operatingReserved]
/// * [nextSettlementAt]
@BuiltValue()
abstract class OwnerOverview
    implements Built<OwnerOverview, OwnerOverviewBuilder> {
  @BuiltValueField(wireName: r'verifiedRevenue')
  Money get verifiedRevenue;

  @BuiltValueField(wireName: r'pending')
  Money get pending;

  @BuiltValueField(wireName: r'available')
  Money get available;

  @BuiltValueField(wireName: r'operatingReserved')
  Money get operatingReserved;

  @BuiltValueField(wireName: r'nextSettlementAt')
  DateTime get nextSettlementAt;

  OwnerOverview._();

  factory OwnerOverview([void updates(OwnerOverviewBuilder b)]) =
      _$OwnerOverview;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(OwnerOverviewBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<OwnerOverview> get serializer =>
      _$OwnerOverviewSerializer();
}

class _$OwnerOverviewSerializer implements PrimitiveSerializer<OwnerOverview> {
  @override
  final Iterable<Type> types = const [OwnerOverview, _$OwnerOverview];

  @override
  final String wireName = r'OwnerOverview';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    OwnerOverview object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'verifiedRevenue';
    yield serializers.serialize(
      object.verifiedRevenue,
      specifiedType: const FullType(Money),
    );
    yield r'pending';
    yield serializers.serialize(
      object.pending,
      specifiedType: const FullType(Money),
    );
    yield r'available';
    yield serializers.serialize(
      object.available,
      specifiedType: const FullType(Money),
    );
    yield r'operatingReserved';
    yield serializers.serialize(
      object.operatingReserved,
      specifiedType: const FullType(Money),
    );
    yield r'nextSettlementAt';
    yield serializers.serialize(
      object.nextSettlementAt,
      specifiedType: const FullType(DateTime),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    OwnerOverview object, {
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
    required OwnerOverviewBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'verifiedRevenue':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(Money),
          ) as Money;
          result.verifiedRevenue.replace(valueDes);
          break;
        case r'pending':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(Money),
          ) as Money;
          result.pending.replace(valueDes);
          break;
        case r'available':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(Money),
          ) as Money;
          result.available.replace(valueDes);
          break;
        case r'operatingReserved':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(Money),
          ) as Money;
          result.operatingReserved.replace(valueDes);
          break;
        case r'nextSettlementAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.nextSettlementAt = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  OwnerOverview deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = OwnerOverviewBuilder();
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
